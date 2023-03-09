const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
    
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
    
      'desktop': '1367px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
});

