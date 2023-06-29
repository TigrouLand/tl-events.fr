import eslintPlugin from 'vite-plugin-eslint';
import { metaTags } from './site.config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  app: {
    head: {
      meta: metaTags,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      links: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    }
  },
  runtimeConfig: {
    discordClientId: '',
    discordClientSecret: '',
    origin: '',
    public: {
    }
  },
  nitro: {
    preset: 'cloudflare-pages'
  },
  vite: {
    plugins: [
      eslintPlugin()
    ]
  }
});
