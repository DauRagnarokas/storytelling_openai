const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],

    theme: {
        colors: {
            'primary': {
                400: '#ff0b7f',
                DEFAULT: '#FF007A',
                600: '#d00064',
            },
            'white': '#fff',
            'accent': '#46B455',
            'light-grey': '#A4A9BF',
            'grey': {
                100: '#E0E0E0',
                200: '#F1F1F1',
                500: '#9F9F9F',
            }
        },
        extend: {}
    },
    plugins: [require('flowbite/plugin')
    ],
};

module.exports = config;
