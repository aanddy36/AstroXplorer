/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily:{
      'sans' : ['Roboto Condensed', 'sans-serif']
    },
    screens: {
      'full':'1000px',
      'laptop': '750px',
      'tablet': '490px'
    },
    extend: {
      fontFamily:{
        'spacex': ['SpaceX', 'sans-serif'],
      }
    },
  },
  plugins: [],
}