import eslintPlugin from 'vite-plugin-eslint';
import { metaTags } from './site.config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  app: {
    head: {
      meta: metaTags,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  vite: {
    plugins: [
      eslintPlugin()
    ]
  }
};
