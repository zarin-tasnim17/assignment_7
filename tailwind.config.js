/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        keenDark: '#2B5A4A', // The dark green from the design
      }
    },
  },
  plugins: [],
}