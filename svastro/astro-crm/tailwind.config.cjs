module.exports = {
  darkMode: 'class', // enables class-based dark mode
  content: [
    './src/**/*.{astro,html,js,ts,svelte,vue,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};