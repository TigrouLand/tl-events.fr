import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  plugins: [animate],
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter'
      },
      colors: {
        primary: '#b23734',
        discord: '#5865f2',
        mumble: '#1e3a8a',
        github: '#111827'
      }
    }
  }
} satisfies Config
