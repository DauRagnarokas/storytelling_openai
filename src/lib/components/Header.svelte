<script>
import Logo from "$lib/components/Logo.svelte";
import SettingsIcon from "$lib/components/SettingsIcon.svelte";

export let hasHorizontalPadding = true
</script>

<div class="flex space-x-4 py-4 {hasHorizontalPadding ? 'px-4' : ''}">
    <Logo/>
    <div class="flex-col flex-auto">
        <h1 class="text-lg font-bold w-full display-font text-brand">Elastic Team</h1>
        <p class="text-lg display-font  font-bold">Open AI - Text Generator</p></div>
    <SettingsIcon/>
</div>
