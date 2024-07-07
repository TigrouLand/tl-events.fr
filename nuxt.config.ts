import { metaTags } from './tools/seo';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    preset: 'cloudflare-pages',
  },
  telemetry: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', 'nuxt-icon'],
  app: {
    head: {
      meta: metaTags,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
});
