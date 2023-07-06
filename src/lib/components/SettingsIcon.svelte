<script>
    import icon from '$lib/assets/settings.svg'
    import Drawer from 'svelte-drawer-component'
    import LogoutButton from "$lib/components/LogoutButton.svelte";
    export let classProp = '';

    let open = false

    let screenSize;
    $: drawerWidth = screenSize < 750 ? '80%' : '600px';
</script>

<svelte:window bind:innerWidth={screenSize}/>

<div class={!open ? 'collapse delay-200' : ''}>
    <Drawer { open } size={drawerWidth} on:clickAway={() => open = false}>
        <div class="min-h-screen">
            <button class="text-brand" on:click={() => open = false}>✕</button>
            <h2>Settings</h2>
                <div class="sticky top-[100vh]">
                    <hr>
                    <LogoutButton/>
                </div>
        </div>
    </Drawer>
</div>
<button on:click={() => open = true}>

    <img src={icon} class="{classProp} w-6 h-6" alt="Settings">
</button>
