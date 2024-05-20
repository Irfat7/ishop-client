/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#EEEEFF",
      secondary: "#F8F8FF",
      "dark-red": "#7D0A0A",
      "light-ash": "#ddd",
      transparent: "#FFFFFF00",
    },
    fontFamily: {
      "roboto-condensed": ["Roboto Condensed", "sans-serif"],
    },
    extend: {
      keyframes: {
        "bounce-once": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20%)" },
        },
      },
      animation: {
        "bounce-once": "bounce-once 0.5s ease-in-out 1",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    require("@nextui-org/react"),
    // ...
  ],
};
