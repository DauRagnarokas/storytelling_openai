import { OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { getTokens } from '$lib/tokenizer'
import { json } from '@sveltejs/kit'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		// makes sure that openai key exists
		if (!OPENAI_KEY) {
			throw new Error('OPENAI_KEY env variable not set')
		}

		// messages send from client side
		const requestData = await request.json()

		// there must be some messages set
		if (!requestData) {
			throw new Error('No request data')
		}

		// converts messages to openai type
		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages

		if (!reqMessages) {
			throw new Error('no messages provided')
		}

		let tokenCount = 0

		// Retrieved total number of token of request messages
		reqMessages.forEach((msg) => {
			if (msg.content) {
				const tokens = getTokens(msg.content)
				tokenCount += tokens
			}
		})

		// checks user input for appropriate language
		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: 'POST',
			body: JSON.stringify({
				input: reqMessages[reqMessages.length - 1].content
			})
		})
		// in case moderation is flagged, error is throned
		if (!moderationRes.ok) {
			const err = await moderationRes.json()
			throw new Error(err.error.message)
		}

		const moderationData = await moderationRes.json()
		const [results] = moderationData.results

		if (results.flagged) {
			throw new Error('Query flagged by openai')
		}

		//personalize ai
		const prompt =
			'You are a virtual assistant for a company called Huntabyte. Your name is Axel Smith'
		tokenCount += getTokens(prompt)

		// in case token limit is reached, query will be reset
		if (tokenCount >= 4000) {
			throw new Error('Query too large')
		}

		// constructs messages array to pass to openai endpoint
		const messages: ChatCompletionRequestMessage[] = [
			{ role: 'system', content: prompt },
			...reqMessages
		]

		// set up request options
		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-3.5-turbo',
			messages,
			temperature: 0.9,
			max_tokens: 4000,
			stream: true
		}

		const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		})

		if (!chatResponse.ok) {
			const err = await chatResponse.json()
			throw new Error(err.error.message)
		}

		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}
