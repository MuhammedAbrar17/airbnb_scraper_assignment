/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'airbnb': {
            'red': '#FF385C',
            'dark': '#FF385C',
            'light': '#FF5A5F',
          },
        },
      },
    },
    plugins: [],
  }