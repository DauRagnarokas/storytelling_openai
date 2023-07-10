<script lang="ts">
    import {ChatCompletionRequestMessageRoleEnum} from 'openai'

    const assistantLabel = 'AI'
    const userLabel = 'ET'

    export let type: ChatCompletionRequestMessageRoleEnum;
    export let message: string

    export let isFirst = true
</script>

<div class="chat {type === ChatCompletionRequestMessageRoleEnum.User ? 'chat-end' : 'chat-start'} {isFirst ? 'pt-4' : 'pt-1'}">
    <div class="chat-avatar  {!isFirst ? 'invisible' : ''}">{type === ChatCompletionRequestMessageRoleEnum.User ? userLabel : assistantLabel}</div>
    <div class="chat-message">
        {message}
    </div>
</div>

<style lang="postcss">
    .chat-avatar {
        @apply
        w-10
        h-10
        rounded-md
        bg-primary
        text-white
        grid
        shrink-0
        font-semibold
        place-items-center;
    }

    .chat {
        @apply
        flex
        space-x-2;
    }

    .chat-start {
        margin-right: 56px;
    }

    .chat-end {
        @apply
        flex-row-reverse
        space-x-reverse;
        margin-left: 56px;
    }

    .chat-message {
        @apply
        rounded-lg px-4 py-2
        text-sm
        bg-grey-200;
    }
</style>
