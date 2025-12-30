import type { NuxtAppConfig } from 'nuxt/schema'

export const seo: NuxtAppConfig['head'] = {
  charset: 'utf-8',
  titleTemplate: '[TL] Events - %s',
  viewport: 'width=device-width, initial-scale=1',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ],
  meta: [
    {
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'description',
      content: 'Des parties privées de type UHC sur Minecraft !\n' + 'Modes de jeu : LG-UHC, Switch, TaupeGun...'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:site',
      content: '@EventsTLV2'
    },
    {
      name: 'twitter:url',
      content: 'https://tl-events.fr'
    },
    {
      name: 'twitter:title',
      content: 'TL - Events'
    },
    {
      name: 'twitter:description',
      content: 'Des parties privées de type UHC sur Minecraft !\n' + 'Modes de jeu : LG-UHC, Switch, TaupeGun...'
    },
    {
      name: 'twitter:image',
      content: 'https://tl-events.fr/icon.webp'
    },
    {
      property: 'og:site_name',
      content: 'TL - Events'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://tl-events.fr'
    },
    {
      property: 'og:title',
      content: 'TL - Events'
    },
    {
      property: 'og:description',
      content: 'Des parties privées de type UHC sur Minecraft !\n' + 'Modes de jeu : LG-UHC, Switch, TaupeGun...'
    },
    {
      property: 'og:image',
      content: 'https://tl-events.fr/icon.webp'
    },
    {
      property: 'og:image:secure_url',
      content: 'https://tl-events.fr/icon.webp'
    }
  ]
}
