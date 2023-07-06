<script>
    export let disabled=true
</script>

<button type="submit" {disabled} class="rounded-md  p-4 text-white  bg-brand-green min-w-[112px] display-font font-bold " class:disabled>
    <slot/>
</button>


<style>
    .disabled {
        @apply
        text-white/50
    }
</style>
