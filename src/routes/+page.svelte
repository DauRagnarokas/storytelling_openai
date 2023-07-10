<script lang="ts">
    import ChatMessage from '$lib/components/ChatMessage.svelte'
    import type {ChatCompletionRequestMessage} from 'openai'
    import {ChatCompletionRequestMessageRoleEnum} from "openai";
    import {SSE} from 'sse.js'
    import SendIcon from "$lib/components/SendIcon.svelte";
    import Header from "$lib/components/Header.svelte";
    import Drawer from "$lib/components/Drawer.svelte";
    import {keywordsStore, temperatureStore, tokensStore, toneStore} from "$lib/store/stores";
    import {onDestroy} from 'svelte'
    import { Modal } from 'flowbite-svelte'

    let errorMessage = 'Some error text';
    let errorModal = false

    let temperature: number
    const temperatureSubscribe = temperatureStore.subscribe((value) => {
        temperature = value
    })

    let tokens: number
    const tokensSubscribe = tokensStore.subscribe((value) => {
        tokens = value
    })

    let keywords: string[]
    const keywordsSubscribe = keywordsStore.subscribe((value) => {
        keywords = value
    })

    let tone: string
    const toneSubscribe = toneStore.subscribe((value) => {
        tone = value
    })

    onDestroy(() => {
        temperatureSubscribe()
        tokensSubscribe()
        keywordsSubscribe()
        toneSubscribe()
    })

    let query = ''
    let answer = ''
    let loading = false
    let chatMessages: ChatCompletionRequestMessage[] = []
    let scrollToDiv: HTMLDivElement


    function scrollToBottom() {
        setTimeout(function () {
            scrollToDiv.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
        }, 100)
    }

    function handleEnter(event: SubmitEvent) {
        if (event.keyCode == 13) {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        // In case query is empty, data is not send to API
        if(query.length === 0) return

        loading = true
        chatMessages = [...chatMessages, {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: query
        }]

        const eventSource = new SSE('/api/chat', {
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({
                messages: chatMessages,
                temperature: temperature,
                tokens: tokens,
                tone: tone,
                keywords: keywords,
            })
        })

        query = ''

        eventSource.addEventListener('error', handleError)

        eventSource.addEventListener('message', (e) => {
            scrollToBottom()
            try {
                loading = false
                if (e.data === '[DONE]') {
                    chatMessages = [...chatMessages, {
                        role: ChatCompletionRequestMessageRoleEnum.Assistant,
                        content: answer
                    }]
                    answer = ''
                    return
                }

                const completionResponse = JSON.parse(e.data)
                const [{delta}] = completionResponse.choices

                if (delta.content) {
                    answer = (answer ?? '') + delta.content
                }
            } catch (err) {
                handleError(err)
            }
        })
        eventSource.stream()
        scrollToBottom()
    }

    function handleError<T>(err: T) {
        loading = false
        query = ''
        answer = ''
        errorMessage = JSON.parse(err.data).error
        errorModal = true
    }
</script>

<Drawer/>
<div class="flex flex-col w-full">
    <div class="fixed top-0 left-0 right-0 bg-white">
        <Header/>
        <hr>
    </div>
    <div class="flex px-4 pt-28 pb-24 flex-col gap-2">
        <ChatMessage type={ChatCompletionRequestMessageRoleEnum.Assistant}
                     message="Hello, ask me anything you want!"/>
        {#each chatMessages as message, index}
            {#if message.content}
                <ChatMessage type={message.role} message={message.content}
                             isFirst={index === 0 || chatMessages[index-1].role !== message.role}/>
            {/if}
        {/each}
        {#if answer}
            <ChatMessage type={ChatCompletionRequestMessageRoleEnum.Assistant}
                         message={answer}/>
        {/if}
        {#if loading}
            <ChatMessage type={ChatCompletionRequestMessageRoleEnum.Assistant}
                         message="Loading.."/>
        {/if}
    </div>
    <div bind:this={scrollToDiv}></div>
    <!--Footer message field-->
    <form
            class="p-4 pt-2 bg-white fixed bottom-0 left-0 right-0"
            on:submit|preventDefault={() => handleSubmit()}
    >
        <label for="prompt" class="relative text-gray-400 focus-within:text-gray-600 block">

            <button type="submit" class="w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-2">
                <SendIcon/>
            </button>

            <input type="text" id="prompt" placeholder="Type your prompt here..."
                   on:keypress={handleEnter} bind:value={query} class="input">
        </label>
    </form>
</div>

<Modal bind:open={errorModal} size="xs" autoclose outsideclose>
    <div class="text-center">
        <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p class="mb-5 text-lg font-semibold">{errorMessage}</p>
        <button on:click={() => errorModal = false} class="error-button min-w-[112px]">OK</button>
    </div>
</Modal>


<style>
    #prompt {
        @apply
        pr-12;
    }
</style>
