/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'primary': "#EEEEFF",
      'secondary': "#F8F8FF",
      "dark-red": "#7D0A0A",
    },
    fontFamily: {
      'roboto-condensed': ["Roboto Condensed", 'sans-serif']
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    nextui()
    // ...
  ],
};
