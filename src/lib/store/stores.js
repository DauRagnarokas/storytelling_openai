import { writable } from 'svelte/store'

export const showDrawerStore = writable(false)
export const tokensStore = writable(4000)
export const temperatureStore = writable(0.9)
export const keywordsStore = writable([])
export const toneStore = writable('')
