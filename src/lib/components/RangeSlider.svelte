<script type="ts">
    import {NumberInput} from "flowbite-svelte";
    import lodash from "lodash/fp";

    export let min = 0;
    export let max;
    export let step = 1;
    export let value;
    export let label;
    export let onChange

    $: labelId = lodash.camelCase(label);

    $: backgroundWidth = value / max * 100 + '%';

</script>

<div>
    <div>
        <label for="{labelId}">{label}</label>
        <div class="flex flex-row items-center">
            <input type="range" id="{labelId}" on:change={(event) => onChange(event.target.value)}
                   class="appearance-none  w-full h-2 p-0 border-0 range-lg rounded-lg
               text-grey-100 bg-grey-100" style:--backgroundWidth={backgroundWidth}
                   {min} {max} {step} bind:value>
            <NumberInput type="number" class="flex-none w-20 text-center" id="rangenumber" {min} {max} {step}
                         bind:value/>
        </div>
    </div>
</div>

<style lang="postcss">

    input[type="range"] {
        @apply
        bg-gradient-to-r from-primary to-primary appearance-none ;
        margin-right: 15px;
        border-radius: 5px;
        background-size: var(--backgroundWidth) 100%;
        background-repeat: no-repeat;

        /* Input Thumb */

        &::-webkit-slider-thumb {
            @apply
            appearance-none    bg-primary;
            background-size: var(--backgroundWidth) 100%;
            background-repeat: no-repeat;
        }

        &::-moz-range-thumb {
            @apply
            appearance-none bg-primary;
            background-size: var(--backgroundWidth) 100%;
            background-repeat: no-repeat;
        }


        &::-ms-thumb {
            border-radius: 50%;
            @apply
            appearance-none  bg-primary;
            background-size: var(--backgroundWidth) 100%;
            background-repeat: no-repeat;
        }


        &::-webkit-slider-thumb:hover {
            @apply
            bg-primary-400;
        }

        &::-moz-range-thumb:hover {
            @apply
            bg-primary-400;
        }

        &::-ms-thumb:hover {
            @apply
            bg-primary-400;
        }

        /* Input Track */

        &::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }

        &::-moz-range-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }

        &::-ms-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }
    }
</style>
