/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#EEEEFF",
      "secondary": "#F8F8FF",
      "dark-red": "#7D0A0A",
      "light-ash": "#ddd",
      "transparent": "#FFFFFF00",
    },
    fontFamily: {
      "roboto-condensed": ["Roboto Condensed", "sans-serif"],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    require("@nextui-org/react"),
    // ...
  ],
};
