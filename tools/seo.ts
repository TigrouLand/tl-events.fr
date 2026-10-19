import type { NuxtAppConfig } from 'nuxt/schema'
import pkg from '../package.json' with { type: 'json' }

export const SERVER_IP = pkg.name
export const PROD_URL = `https://${pkg.name}`
export const API_URL = `https://api.${pkg.name}/${pkg.version}`
export const AVATAR_URL = `https://avatars.${pkg.name}`
export const APP_DESC = pkg.description
export const APP_VERSION = pkg.version
export const FULL_APP_NAME = 'TigrouLand'
export const APP_NAME = `${FULL_APP_NAME.match(/[A-Z]/g)?.join('')} - Events` // regex for uppercase chars only

type Link = Record<'to' | 'label' | 'icon', string>

// label prop is a i18n local key
// icons can be found under: https://icones.js.org
export const navLinks = [
  { to: '/', label: 'home', icon: 'mynaui:home' },
  { to: '/members', label: 'members', icon: 'mynaui:users' },
  { to: '/gamemodes', label: 'gamemodes', icon: 'material-symbols:chess-pawn-outline' },
  { to: '/games', label: 'games', icon: 'ion:game-controller' },
  { to: '/news', label: 'news.title', icon: 'famicons:newspaper-outline' }
] satisfies Link[]

export const socialLinks = [
  {
    to: `https://gitlab.com/${FULL_APP_NAME.toLowerCase()}/web/${pkg.name}`,
    icon: 'vscode-icons:file-type-gitlab',
    label: 'Gitlab'
  },
  {
    to: `mumble://mumble.${pkg.name}`,
    icon: 'simple-icons:mumble',
    label: 'Mumble'
  },
  {
    to: 'https://discord.gg/qV5TYGx',
    icon: 'selfhst:discord',
    label: 'Discord'
  }
] satisfies Link[]

export const seo = (themeColor: string): NuxtAppConfig['head'] => ({
  charset: 'utf-8',
  titleTemplate: `${APP_NAME} | %s`,
  viewport: 'width=device-width, initial-scale=1',
  link: [
    // fonts are fetched in CORS mode: preloading them without crossorigin would download twice
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/monocraft-regular.woff2', crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/monocraft-bold.woff2', crossorigin: 'anonymous' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: pkg.description },
    { property: 'og:site_name', content: APP_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: PROD_URL },
    { property: 'og:title', content: APP_NAME },
    { name: 'theme-color', content: themeColor },
    { property: 'og:description', content: pkg.description },
    { property: 'og:image', content: `${PROD_URL}/logo.webp` }
  ]
})
