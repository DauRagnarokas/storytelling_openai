<script>
    import {page} from "$app/stores";
</script>

<div class="px-4">
    <div class="rounded-lg w-full my-4 mx-auto bg-gradient-to-r border border-gray-200  p-2 sm:p-6">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary ">
                {$page.status}</h1>
                <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
                    {$page.error.message}</p>
                <p class="mb-4 text-lg font-light text-gray-500 ">Sorry, we can't find that page.
                </p> <a href="/"
                        class="error-button">Back
                    to Homepage</a></div>
        </div>
    </div>
</div>
