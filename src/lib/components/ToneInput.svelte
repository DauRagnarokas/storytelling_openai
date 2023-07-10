<script>
    import {Select} from 'flowbite-svelte';
    import {toneStore} from "$lib/store/stores.js";
    import {onDestroy} from 'svelte'

    let tone
    const toneSubscribe = toneStore.subscribe((value) => (tone = value))

    onDestroy(() => {
        toneSubscribe()
    })

    let textTone = [
        {value: '', name: "-"},
        {value: "Formal", name: "Formal"},
        {value: "Informal", name: "Informal"},
        {value: "Old-fashioned", name: "Old-fashioned"},
        {value: "Modern", name: "Modern"},
    ]

    $: {
        toneStore.set(tone)
    }

    const label = 'Tone of speech'

</script>

<label for="toneInput" class="label">{label}
    <Select id="toneInput" class="h-12" items={textTone} bind:value={tone}/>
</label>
