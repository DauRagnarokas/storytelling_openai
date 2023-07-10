<script>
import Logo from "$lib/components/Logo.svelte";
import SettingsIcon from "$lib/components/SettingsIcon.svelte";

export let hasHorizontalPadding = true
export let showSettingsButton = true
</script>

<div class="flex items-center space-x-4 py-4 {hasHorizontalPadding ? 'px-4' : ''}">
    <Logo/>
    <div class="flex-col flex-auto">
        <h1 class="text-lg display-font font-semibold text-primary leading-6">Elastic Team</h1>
        <p class="text-lg display-font font-semibold leading-6">Open AI - Text Generator</p></div>
    {#if showSettingsButton}
    <SettingsIcon/>
        {/if}
</div>
