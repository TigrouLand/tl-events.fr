import { DEFAULT_LANG, locales } from './tools/i18n'
import { APP_DESC, FULL_APP_NAME, PROD_URL, seo } from './tools/seo'

/** https://v3.nuxtjs.org/api/configuration/nuxt.config */
export default defineNuxtConfig({
  compatibilityDate: '2026-06-06',
  telemetry: false,
  css: ['~/styles/global.css'],
  typescript: { tsConfig: { compilerOptions: { strictNullChecks: true } } },
  nitro: { preset: 'cloudflare-pages' },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-llms',
    'shadcn-nuxt',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-og-image'
  ],
  colorMode: {
    classSuffix: '',
  },
  content: { type: 'd1', bindingName: 'DB' }, // default @next/content config values
  icon: { serverBundle: { collections: ['simple-icons'] } },
  i18n: { defaultLocale: DEFAULT_LANG.code, locales },
  app: { head: seo },
  imports: { imports: [{ name: 'cn', from: '~/tools/utils' }] },
  experimental: { viteEnvironmentApi: true },
  llms: {
    domain: PROD_URL,
    title: FULL_APP_NAME,
    description: APP_DESC,
  }
})