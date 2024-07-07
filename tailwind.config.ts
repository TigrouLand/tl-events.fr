/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#b23734',
        discord: '#5865f2',
        twitter: '#1c9cea',
      },
    },
  },
};
