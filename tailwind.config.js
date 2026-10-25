/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barberDark: '#161B2C',
        barberBlue: '#272F4A',
        barberLight: '#D9D9D9',
      },
    },
  },
  plugins: [],
}