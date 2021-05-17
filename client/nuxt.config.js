export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Events - %s',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Des parties privées diverses et variées de type UHC sur Minecraft 1.8 ! ' +
          'Modes de jeux : Switch, SkyDefender, TaupeGun... et bien plus encore !'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@EventsTLV2'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://events.romitou.fr'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'TL - Events'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Des parties privées diverses et variées de type UHC sur Minecraft 1.8 ! ' +
          'Modes de jeux : Switch, SkyDefender, TaupeGun... et bien plus encore !'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://events.romitou.fr/icon.png'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'TL - Events'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://events.romitou.fr'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'TL - Events'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Des parties privées diverses et variées de type UHC sur Minecraft 1.8 ! ' +
          'Modes de jeux : Switch, SkyDefender, TaupeGun... et bien plus encore !'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://events.romitou.fr/icon.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://events.romitou.fr/icon.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Fontawesome
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api-events.romitou.fr'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fr'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  loading: '~/components/Loading.vue'
};
