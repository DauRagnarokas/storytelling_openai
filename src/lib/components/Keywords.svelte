<script>
    import CloseIcon from "$lib/components/CloseIcon.svelte";
    import lodash from "lodash/fp";
    import {keywordsStore} from '$lib/store/stores.js'
    import {onDestroy} from 'svelte'

    let keywordsAll
    const keywordsSubscribe = keywordsStore.subscribe((value) => (keywordsAll = value))

    onDestroy(() => {
        keywordsSubscribe()
    })

    function setKeywordsStore() {
        keywordsStore.set(keywordsAll)
    }

    function addKeyword() {
        if (keyword.length > 0) {
            keywordsAll = [...keywordsAll, lodash.capitalize(keyword)]
            setKeywordsStore()
            keyword = ''
        }
    }

    function handleEnter(event) {
        if (event.keyCode == 13) {
            addKeyword();
        }
    }


    function removeKeyword(index) {
        keywordsAll = keywordsAll.filter((_, index2) => index2 != index)
    }

    let keyword;

</script>

<form>
    <label for="keyword" class="label">Keywords</label>
    <div class="relative">
        <input type="text" id="keyword" bind:value={keyword}
               class="input"
               placeholder="Add a keyword.." on:keypress={handleEnter}>
        <button type="submit" on:click={addKeyword}
                class="text-white absolute bg-primary top-1/2 px-4 h-12 rounded-md transform -translate-y-1/2 right-0 ">
            + Add
        </button>
    </div>
</form>
<div class="flex pt-2 flex-wrap">
    {#each keywordsAll as item, index}
        <div class="flex justify-center items-center m-1 pl-4 pr-3 py-1 rounded-full bg-accent text-base text-white font-medium">
            <span>{item}</span>
            <button on:click={() => removeKeyword(index)}>
                <CloseIcon/>
            </button>
        </div>
    {/each}
</div>
