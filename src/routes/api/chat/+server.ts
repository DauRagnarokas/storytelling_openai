import { OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { getTokens } from '$lib/tokenizer'
import { json, error } from '@sveltejs/kit'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Makes sure that openai key exists
		if (!OPENAI_KEY) {
			throw error(500, 'OPENAI_KEY env variable not set')
		}

		// Messages send from client side
		const requestData = await request.json()

		// There must be some data set
		if (!requestData) {
			throw error(500, 'No request data')
		}

		// Assign request messages to variable
		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages
		if (!reqMessages) {
			throw error(500, 'No messages provided')
		}

		// User settings
		const reqTemperature = parseFloat(requestData.temperature)
		const reqTokens = parseInt(requestData.tokens)

		let tokenCount = 0

		// Retrieved total number of token of request messages
		reqMessages.forEach((msg) => {
			if (msg.content) {
				const tokens = getTokens(msg.content)
				tokenCount += tokens
			}
		})

		// Checks user input for appropriate language
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

		// Content has to be in appropriate language
		if (!moderationRes.ok) {
			const err = await moderationRes.json()
			throw error(500, err.error.message)
		}

		const moderationData = await moderationRes.json()
		const [results] = moderationData.results

		if (results.flagged) {
			throw error(500, 'Query flagged by openai')
		}

		// Personalize ai
		let prompt =
			'The goal of the conversation is to create a story based on user inputs. It should cater to casual users seeking fun and engaging text-generation experiences but also function as a useful tool for professional writers, content creators, and individuals in creative fields.'
		// add keywords
		if (requestData.keywords.length > 0) {
			prompt += `\nUse these keywords: ${requestData.keywords.join(', ')}`
		}
		if (requestData.tone.length > 0) {
			prompt += `\nUse ${requestData.tone} speech`
		}
		tokenCount += getTokens(prompt)

		// In case token limit is reached, query will be reset
		if (tokenCount >= reqTokens) {
			throw error(500, 'Query too large')
		}

		// Constructs messages array to pass to openai endpoint
		const messages: ChatCompletionRequestMessage[] = [
			{ role: 'system', content: prompt },
			...reqMessages
		]

		// Set up request options
		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-3.5-turbo',
			messages,
			temperature: reqTemperature,
			max_tokens: reqTokens,
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
			throw error(500, err.error.message)
		}

		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: err.status })
	}
}
