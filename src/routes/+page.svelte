<script lang="ts">
    import ChatMessage from '$lib/components/ChatMessage.svelte'
    import type {ChatCompletionRequestMessage} from 'openai'
    import {ChatCompletionRequestMessageRoleEnum} from "openai";
    import {SSE} from 'sse.js'
    import SendIcon from "$lib/components/SendIcon.svelte";
    import Header from "$lib/components/Header.svelte";

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
            console.log('event')

            console.log(event.keyCode)
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        loading = true
        chatMessages = [...chatMessages, {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: query
        }]

        const eventSource = new SSE('/api/chat', {
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({messages: chatMessages})
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
        console.error(err)
    }
</script>

<div class="flex flex-col w-full">
    <form
            class="p-4 pt-2 bg-white fixed bottom-0 left-0 right-0"
            on:submit|preventDefault={() => handleSubmit()}
    >
        <label for="email" class="relative text-gray-400 focus-within:text-gray-600 block">

            <button type="submit" class="w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-2">
                <SendIcon/>
            </button>

            <input type="text" name="email" id="email" placeholder="Type your prompt here..."
                   on:keypress={handleEnter} bind:value={query} class="rounded-md w-full">
        </label>
        <!--                <input type="text" class="input w-full" bind:value={query}/>-->
        <!--                <button type="submit" class="btn btn-accent"> Send</button>-->
    </form>
    <div class="fixed top-0 left-0 right-0 bg-white">
        <Header/>
        <hr>
    </div>
    <div class="flex px-4 pt-28 pb-24 flex-col gap-2">
        <ChatMessage type={ChatCompletionRequestMessageRoleEnum.Assistant}
                     message="Hello, ask me anything you want!"/>
        <ChatMessage type={ChatCompletionRequestMessageRoleEnum.User}
                     message="What is your age?"/>
        <ChatMessage type={ChatCompletionRequestMessageRoleEnum.User}
                     message="I'm sorry, but I'm not sure what refers to. Could you please provide more information or clarify your request? 3"
                     isFirst={false}/>
        <ChatMessage type={ChatCompletionRequestMessageRoleEnum.User}
                     message="The exact center of Europe is a topic of debate and there is no universally agreed-upon location. However, there are a few places that are commonly considered as potential centers of Europe. One such place is the municipality of Rakhiv in the Zakarpattia Oblast of Ukraine. Another popular contender is Vilnius, the capital city of Lithuania. Ultimately, the concept of the center of Europe is open to interpretation and can vary depending on the method used to calculate it. 5"
        />
        {#each chatMessages as message, index}
            {#if message.content}
                <ChatMessage type={message.role} message={message.content + ' ' + index}
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

</div>
