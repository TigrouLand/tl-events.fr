import type { NuxtAppConfig } from 'nuxt/schema'
import pkg from '../package.json' with { type: 'json' }

export const SERVER_IP = pkg.name
export const PROD_URL = `https://${pkg.name}`
export const API_URL = `https://api.${pkg.name}/${pkg.version}`
export const AVATAR_URL = `https://avatars.${pkg.name}`
export const APP_DESC = pkg.description
export const APP_VERSION = pkg.version
export const FULL_APP_NAME = 'TigrouLand'
export const APP_NAME = `${FULL_APP_NAME.match(/[A-Z]/g)?.join((''))} - Events`

export const navLinks = [
  { to: '/', label: 'home', icon: 'mynaui:home' },
  { to: '/members', label: 'members', icon: 'mynaui:users' },
  { to: '/news', label: 'news.title', icon: 'famicons:newspaper-outline' },
  { to: '/games', label: 'games', icon: 'ion:game-controller' }
]

export const socialLinks = [
  {
    href: `https://github.com/${FULL_APP_NAME}/${pkg.name}`,
    icon: 'simple-icons:github',
    label: 'Github',
  },
  {
    href: `mumble://mumble.${pkg.name}`,
    icon: 'simple-icons:mumble',
    label: 'Mumble',
  },
  {
    href: 'https://discord.gg/qV5TYGx',
    icon: 'simple-icons:discord',
    label: 'Discord',
  }
]

export const seo: NuxtAppConfig['head'] = {
  charset: 'utf-8',
  titleTemplate: `${APP_NAME} | %s`,
  viewport: 'width=device-width, initial-scale=1',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: pkg.description },
    { property: 'og:site_name', content: APP_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: PROD_URL },
    { property: 'og:title', content: APP_NAME },
    {property: 'theme-color', content: '#B23734' },
    { property: 'og:description', content: pkg.description },
    { property: 'og:image', content: `${PROD_URL}/logo.webp` },
    { property: 'og:image:secure_url', content: `${PROD_URL}/logo.webp` },
  ]
}
