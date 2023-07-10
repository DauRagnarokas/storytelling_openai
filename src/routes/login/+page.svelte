<script>
    import Header from "$lib/components/Header.svelte";
    import {enhance} from "$app/forms";
    import {PUBLIC_USERNAME, PUBLIC_PASSWORD} from '$env/static/public'

    export let form

    let username = form?.username ?? ''
    let password = ''
    $: isValidForm = username === PUBLIC_USERNAME && password === PUBLIC_PASSWORD;
</script>

<div class="flex h-screen">
    <div class="w-full max-w-[535px] px-4 m-auto pb-12">
        <Header hasHorizontalPadding={false} showSettingsButton={false}/>
        <p class="display-font font-semibold text-xl pt-4 pb-5">Please log in to continue</p>
        <form method="post" action="?/login" use:enhance>
            <label class="label">Email Address
                <input type="email" name="username" bind:value={username} class="mb-6 mt-2 input">
            </label>
            <label class="label">Password
                <input type="password" name="password" bind:value={password} class="mb-10 mt-2 input">
            </label>
            <button type="submit" disabled={!isValidForm} class="button bg-accent" class:disabled={!isValidForm}>
                Log in
            </button>
        </form>
    </div>
</div>

<style lang="postcss">
    .disabled {
        @apply
        text-white/50
    }
</style>
