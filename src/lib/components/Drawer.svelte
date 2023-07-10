<script>
    import {CloseButton} from 'flowbite-svelte';
    import LogoutButton from "$lib/components/LogoutButton.svelte";
    import Drawer from 'svelte-drawer-component'
    import RangeSlider from "$lib/components/RangeSlider.svelte";

    import {showDrawerStore, temperatureStore, tokensStore} from "$lib/store/stores.js";
    import Keywords from "$lib/components/Keywords.svelte";
    import ToneInput from "$lib/components/ToneInput.svelte";

    function displayDrawer(value) {
        showDrawerStore.set(value)
    }

    function setTemperatureStore(value) {
        temperatureStore.set(value)
    }

    function setTokensStore(value) {
        tokensStore.set(value)
    }

    function onLogout() {
        displayDrawer(false)
    }

    const breakPoint = 700
    let screenSize;
    $: drawerWidth = screenSize < breakPoint ? '80%' : breakPoint / 1.25 + 'px';
</script>

<svelte:window bind:innerWidth={screenSize}/>

<Drawer open={ $showDrawerStore } size={drawerWidth} on:clickAway={() => displayDrawer(false)}>
    <div class="min-h-screen p-4">
        <div class='flex items-center'>
            <h5 class="display-font font-semibold text-lg uppercase">Settings</h5>
            <CloseButton on:click={() => displayDrawer(false)}/>
        </div>
        <br/>
        <br/>
        <RangeSlider max="2" step="0.1" value={$temperatureStore} onChange={setTemperatureStore} label="Temperature"/>
        <br/>
        <RangeSlider min="150" max="4096" value={$tokensStore} onChange={setTokensStore} label="Maximum length"/>
        <br/>
        <ToneInput/>
        <br/>
        <Keywords/>
        <br/>
        <div class="sticky top-[100vh]">
            <LogoutButton callback={onLogout}/>
        </div>
    </div>
</Drawer>
