/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@aceternity/ui/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue Pro"', 'sans-serif'],
        source: ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        'se-blue': '#317DB2',
        'se-green': '#ABC737',
        'se-snow': '#FDFEFC',
        'se-sdg7': '#F9B817',
        'se-alert': '#F04B58',
        'se-deep': '#0d1b2a',
        'se-section': '#16213e',
        'se-card': '#1a2744',
      },
    },
  },
  plugins: [],
};
