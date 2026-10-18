<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { APP_NAME, PROD_URL } from '~/tools/seo'

const { data: posts } = await useAsyncData('news', () => {
  return queryCollection('docs').order('date', 'DESC').all()
})

function getImage(post: { path: string }) {
  return `/news${post.path}.webp`
}

const loadedImages = ref<Set<string>>(new Set())

const { t, locale } = useI18n()
const localePath = useLocalePath()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(date))
}

useHead({ title: t('news.title') })
useSeoMeta({ ogTitle: `${APP_NAME} > ${t('news.title')}` })

const route = useRoute()
const absolute = (path: string) => new URL(localePath(path), PROD_URL).href
const homeURL = absolute('/')
// the server redirects /news -> /news/, so take the canonical from the route that actually matched
const newsURL = new URL(route.path, PROD_URL).href

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': newsURL,
            url: newsURL,
            name: t('news.title'),
            inLanguage: locale.value,
            isPartOf: { '@type': 'WebSite', '@id': homeURL, url: homeURL, name: APP_NAME },
            mainEntity: {
              '@type': 'ItemList',
              itemListOrder: 'https://schema.org/ItemListOrderDescending',
              numberOfItems: posts.value?.length ?? 0,
              itemListElement: (posts.value ?? []).map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: post.title,
                url: absolute(`/news${post.path}`)
              }))
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: t('home'), item: homeURL },
              { '@type': 'ListItem', position: 2, name: t('news.title'), item: newsURL }
            ]
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <div v-if="posts?.length" class="grid place-items-center mt-32 max-w-5xl mx-auto gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <NuxtLink v-for="post in posts" :key="post.path" :to="'/news'.concat(post.path)">
      <Card class="h-full py-0 pb-6 transition-opacity hover:opacity-80">
        <div class="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Skeleton v-if="!loadedImages.has(getImage(post))" class="absolute inset-0 rounded-none" />
          <img
            :src="getImage(post)"
            :alt="post.title"
            class="w-full h-full object-cover"
            @load="loadedImages.add(getImage(post))"
          />
        </div>
        <CardHeader>
            <span class="text-accent-foreground/70">
                <Icon name='ic:outline-calendar-today' class='mb-1 mr-1' size='16' /> {{ formatDate(post.date) }}
            </span>
          <CardTitle class="text-2xl">{{ post.title }}</CardTitle>
          <CardDescription>{{ post.description }}</CardDescription>
        </CardHeader>
      </Card>
    </NuxtLink>
  </div>
</template>
