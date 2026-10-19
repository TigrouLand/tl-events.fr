import { DEFAULT_LANG, locales } from './tools/i18n'
import { llms } from './tools/llms'
import { APP_DESC, APP_NAME, PROD_URL, seo } from './tools/seo'
import { THEME_BACKGROUND, THEME_COLOR } from './tools/theme'

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
    // both must load before @nuxt/content: the git module feeds it frontmatter, and the sitemap
    // module skips its content integration when Content is already installed
    './tools/content-git-dates',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-llms',
    'shadcn-nuxt',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-og-image',
    '@nuxtjs/robots',
    '@vite-pwa/nuxt'
  ],
  colorMode: {
    classSuffix: ''
  },
  content: { database: { type: 'd1', bindingName: 'DB' } },
  icon: { serverBundle: { collections: ['simple-icons'] } },
  i18n: { defaultLocale: DEFAULT_LANG.code, locales },
  site: { url: PROD_URL },
  pwa: {
    registerType: 'autoUpdate',
    registerWebManifestInRouteRules: true,
    devOptions: { enabled: true },
    manifest: {
      name: APP_NAME,
      short_name: APP_NAME.split(' - ').join(' '),
      description: APP_DESC,
      lang: DEFAULT_LANG.code,
      dir: 'ltr',
      id: '/',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: THEME_BACKGROUND,
      theme_color: THEME_COLOR,
      categories: ['games'],
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      // an SSR app has no index.html: a navigation fallback would serve a dead precached page
      navigateFallback: undefined,
      globPatterns: ['**/*.{css,js,ico,png,svg,woff2,webp,webmanifest}']
    }
  },
  app: { head: seo(THEME_COLOR) },
  imports: { imports: [{ name: 'cn', from: '~/tools/utils' }] },
  experimental: { viteEnvironmentApi: true },
  llms
})
