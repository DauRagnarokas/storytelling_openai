<script>
    import icon from '$lib/assets/logout-icon.svg'
    import {enhance} from "$app/forms";

    export let classProp = '';
    export let callback;

</script>

<form method="post" action="/login?/logout" use:enhance>
    <button type="submit" on:click={callback} class="flex items-center space-x-4 px-4 h-12 border rounded-lg">
        <img src={icon} class="{classProp}" alt="Log out">
        <span>Log out</span>
    </button>
</form>
