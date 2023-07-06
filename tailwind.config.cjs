const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    theme: {
        borderRadius: {
            'sm': '4px',
            'md': '10px',
            'lg': '12px',
        },
        colors: {
            'brand': '#FF007A',
            'white': '#fff',
            'brand-green': '#46B455',
            'grey': {
                100: '#E0E0E0',
                200: '#F1F1F1',
            }
        },
        extend: {}
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ff007a",
                    "secondary": "#570df8",
                    "accent": "#46b455",
                    "neutral": "#3d4451",
                    "base-100": "#ffffff",
                    ".btn-accent": {
                        "color": "#ffffff",
                    },
                    ".btn-accent[disabled], .btn-accent:disabled" : {
                        'color': 'rgba(255,255,255,0.5)',
                        'background-color': '#46b455'
                    }
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};

module.exports = config;
