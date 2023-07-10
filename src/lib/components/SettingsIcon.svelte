<script>
    import icon from '$lib/assets/settings.svg'
    import {showDrawerStore} from "$lib/store/stores.js";

    export let classProp = '';

    function displayDrawer(value) {
        showDrawerStore.set(value)
    }
</script>


<button on:click={() => displayDrawer(true)}>
    <img src={icon} class="{classProp} w-6 h-6" alt="Settings">
</button>
