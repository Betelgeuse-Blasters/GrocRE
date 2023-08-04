/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      theme: {
        fontFamily: {
          sans: ['Cairo Play', 'sans-serif'],
          cursive: ['Playball', 'cursive'],
        },
      },
    },
  },
  plugins: [],
}