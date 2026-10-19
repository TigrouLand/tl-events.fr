<template>
  <div class="error-background flex min-h-screen w-full flex-col">
    <header class="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
      <NuxtImg src="/logo.webp" alt="Logo" draggable="false" class="h-12 rounded-full select-none" />
      <LangSelector />
    </header>

    <main class="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-5 px-4 pb-24 text-center sm:px-6">
      <div class="error-code custom-shadow uppercase text-6xl font-bold text-foreground sm:text-8xl">{{ statusCode }}</div>
      <h1 class="text-2xl font-bold text-foreground sm:text-3xl">{{ t(copy.title) }}</h1>
      <p class="max-w-prose text-muted-foreground">{{ t(copy.description) }}</p>
      <div class="mt-3 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink :to="localePath('/')" :class="buttonVariants({ size: 'lg' })">
          <Icon name="mynaui:home" />
          {{ t('buttons.backHome') }}
        </NuxtLink>
        <Button v-if="isUnavailable" variant="outline" size="lg" @click="retry">
          <Icon name="fa6-solid:arrow-rotate-right" />
          {{ t('buttons.retry') }}
        </Button>
        <Button v-if="isUnavailable && discordLink" as-child variant="outline" size="lg">
          <NuxtLink :href="discordLink.to" target="_blank" rel="noopener noreferrer">
            <Icon :name="discordLink.icon" />
            {{ t('buttons.discord') }}
          </NuxtLink>
        </Button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import type { StatusCode } from '#nuxtseo/h3'
import { Button, buttonVariants } from '~/components/ui/button'
import { socialLinks } from '~/tools/seo'

const props = defineProps<{ error: NuxtError }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const statusCode = computed(() => props.error.status as StatusCode)

// 503 is what the API-driven pages throw when the backend is unreachable, 0 is a client-side network failure
const isUnavailable = computed((): boolean => statusCode.value >= 500 || statusCode.value === 0)

const discordLink = computed(() => socialLinks.find(({ label }) => label === 'Discord'))

const copy = computed((): { title: string; description: string } => {
  if (statusCode.value === 404) return { title: 'errorPage.notFound.title', description: 'errorPage.notFound.description' }
  if (isUnavailable.value) return { title: 'errorPage.unavailable.title', description: 'errorPage.unavailable.description' }
  return { title: 'errorPage.generic.title', description: 'errorPage.generic.description' }
})

const retry = (): void => {
  window.location.assign(route.fullPath)
}

useHead({
  htmlAttrs: { lang: () => locale.value },
  title: () => t(copy.value.title),
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>

<style scoped>
@reference "tailwindcss";

.error-background {
  background:
    linear-gradient(
      to bottom,
      color-mix(in oklab, var(--background) 65%, transparent),
      color-mix(in oklab, var(--background) 88%, transparent)
    ),
    url("/background.webp") center / cover no-repeat;
}

.error-code {
  text-shadow: 6px 6px 0 var(--color-primary);
}
</style>
