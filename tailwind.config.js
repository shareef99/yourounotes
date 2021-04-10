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
                bg: {
                    DEFAULT: "#fffffe",
                    dark: "#16161a",
                },
                heading: {
                    // sub-heading, card-heading(dark also), card-paragraph = light mode
                    DEFAULT: "#2b2c34",
                    dark: "#fffffe",
                },
                para: {
                    DEFAULT: "#2b2c34",
                    dark: "#94a1b2", // sub-heading, card-paragraph = dark mode
                },
                btn: {
                    DEFAULT: "#6246ea",
                    dark: "#7f5af0",
                },
                btnText: {
                    DEFAULT: "#fffffe",
                    dark: "#fffffe",
                },
                cardBg: {
                    DEFAULT: "#d1d1e9",
                    dark: "#16161a",
                },
            },
            spacing: {
                "9/10": "90%",
                "1/10": "10%",
                "5%": "5%",
                "7.5%": "7.5%",
            },
            maxWidth: {
                "9/10": "90%",
            },
            transitionProperty: {
                display: "display",
            },
        },
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
        container: {
            center: true,
            padding: "2rem",
        },
        backgroundPosition: {
            bottom: "bottom",
            "bottom-4": "center bottom 4rem",
            center: "center",
            left: "left",
            "left-bottom": "left bottom",
            "left-top": "left top",
            right: "right",
            "right-bottom": "right bottom",
            "right-top": "right top",
            top: "top",
            "top-4": "center top 1rem",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
