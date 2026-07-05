<script setup lang="ts">
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

const { data: posts } = await useAsyncData('news', () => {
  return queryCollection('docs').order('date', 'DESC').all()
})

function getImage(post: { path: string }) {
  return `/news${post.path}.webp`
}

const loadedImages = ref<Set<string>>(new Set())

const { t, locale } = useI18n()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(date))
}

useHead({ title: t('news.title') })
</script>

<template>
  <div v-if="posts?.length" class="grid place-items-center mt-32 max-w-5xl mx-auto gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <NuxtLink v-for="post in posts" :key="post.path" :to="'/news'.concat(post.path)">
      <Card class="h-full py-0 pb-6 transition-opacity hover:opacity-80">
        <div class="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Skeleton v-if="!loadedImages.has(getImage(post))" class="absolute inset-0" />
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
