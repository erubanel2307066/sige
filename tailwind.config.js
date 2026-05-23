/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sep: {
          guinda: '#691C32',
          dorado: '#BC955C',
          guinda_dark: '#481322',
        },
        bg: {
          light: '#f4f6f8',
          dark: '#1a1a1a',
        }
      },
    },
  },
  plugins: [],
}
