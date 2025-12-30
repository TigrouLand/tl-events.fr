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
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],

  app: {
    head: seo
  }
})
