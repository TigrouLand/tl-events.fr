<script setup lang="ts">
import { type Lang, OG_LOCALES } from '~/tools/i18n'
import { APP_NAME, FULL_APP_NAME, PROD_URL } from '~/tools/seo'

const { locale } = useI18n()
const route = useRoute()
const canonicalURL = computed(() => `${PROD_URL}${route.path}`)

useSeoMeta({
  ogLocale: () => OG_LOCALES[locale.value as Lang],
  ogUrl: canonicalURL,
  ogImage: () => `${PROD_URL}/logo.webp`,
  ogImageAlt: `${APP_NAME} logo`
})

useHead({
  htmlAttrs: { lang: () => locale.value },
  link: [{ rel: 'canonical', href: canonicalURL }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${PROD_URL}/#website`,
            url: `${PROD_URL}/`,
            name: APP_NAME,
            inLanguage: locale.value,
            publisher: { '@id': `${PROD_URL}/#organization` }
          },
          {
            '@type': 'Organization',
            '@id': `${PROD_URL}/#organization`,
            name: FULL_APP_NAME,
            url: PROD_URL,
            logo: { '@type': 'ImageObject', url: `${PROD_URL}/logo.webp` }
          }
        ]
      })
    }
  ]
})
</script>

<template>
    <VitePwaManifest />
    <Nav />
    <main class="h-screen w-screen overflow-y-auto overflow-x-hidden">
        <slot />
    </main>
</template>

<style>
@reference "tailwindcss";

    #__nuxt {
        @apply h-screen w-screen overflow-y-auto overflow-x-hidden;
    }
</style>
