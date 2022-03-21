module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        tigrouland: '#b23734',
        blurple: '#5865f2',
        twitter: '#1c9cea'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
