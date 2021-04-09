const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "#fffffe",
                    dark: "#16161a",
                },
                heading: {
                    // sub-heading, card-heading(dark also), card-paragraph = light mode
                    DEFAULT: "#2b2c34",
                    dark: "#fffffe",
                },
                paragraph: {
                    DEFAULT: "#2b2c34",
                    dark: "#94a1b2", // sub-heading, card-paragraph = dark mode
                },
                button: {
                    DEFAULT: "#6246ea",
                    dark: "#7f5af0",
                },
                buttonText: {
                    DEFAULT: "#fffffe",
                    dark: "#fffffe",
                },
                cardBackground: {
                    DEFAULT: "#d1d1e9",
                    dark: "#16161a",
                },
            },
        },
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
