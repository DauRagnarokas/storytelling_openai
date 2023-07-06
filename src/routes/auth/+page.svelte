<script>
    import Header from "$lib/components/Header.svelte";
    import Button from "$lib/components/Button.svelte";
    import {enhance} from "$app/forms";

    export let form

    let username = form?.username ?? ''
    let password = ''
    $: isValidForm = username.length > 0 && password.length > 0;
</script>

<div class="flex h-screen">
    <div class="w-full max-w-[535px] px-4 m-auto pb-12">
        <div class="drawer">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <!-- Page content here -->
                <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
            </div>
            <div class="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <!-- Sidebar content here -->
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>

                </ul>
            </div>
        </div>
<!--        <Header hasHorizontalPadding={false} showLogoutButton={false}/>-->
        <p class="display-font font-bold text-xl py-3">Please log in to continue</p>
        <form method="post" action="?/login" use:enhance>
            <p>{form?.message ?? ''}</p>
            <p class="py-4">Email Address</p>
            <input type="email" name="username" bind:value={username} class="mb-2">
            <p class="py-4">Password</p>
            <input type="password" name="password" bind:value={password} class="mb-10">
           <button class="btn btn-accent">Login</button>
            <Button disabled={!isValidForm}>Login</Button>
        </form>
    </div>
</div>
