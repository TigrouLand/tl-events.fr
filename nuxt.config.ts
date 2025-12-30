import { seo } from './tools/seo'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true
  },

  nitro: {
    preset: 'cloudflare-pages'
  },

  telemetry: false,
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },

  app: {
    head: seo
  }
})
