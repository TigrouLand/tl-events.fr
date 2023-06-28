module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: '#da817f',
          200: '#d36b68',
          300: '#cc5451',
          400: '#c53d3a',
          500: '#b23734',
          600: '#972f2c',
          700: '#802725',
          800: '#68201f',
          900: '#511918'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
