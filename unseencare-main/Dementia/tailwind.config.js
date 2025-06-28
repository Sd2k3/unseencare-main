/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
        './node_modules/swiper/**/*.{js,ts,jsx,tsx}',
 
    './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};