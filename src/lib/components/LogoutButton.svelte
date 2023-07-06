<script>
    import icon from '$lib/assets/logout-icon.svg'
    import {enhance} from "$app/forms";
    export let classProp = '';

</script>

<form method="post" action="/auth?/logout" use:enhance>
    <button class="p-4 flex space-x-4">
        <img src={icon} class="{classProp}" alt="Log out">
        <span>Log out</span>
    </button>
</form>
