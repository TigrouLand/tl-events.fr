<template>
    <main class='mx-auto max-w-5xl px-4 py-8 mt-32'>
        <Breadcrumb class='mb-3'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as='a' href='/''>
                  <Icon name="mynaui:home" size='18' class='mb-1.25' /> {{ $t('home') }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as='a' href='/news'>
                  <Icon name="famicons:newspaper-outline" size='18' class='mb-1.25' /> {{ $t('news.title') }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{{ page?.title }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <img :src='image' :alt='page?.title' class='w-full h-auto rounded-xl shadow-xl' />
        <div class='flex items-center justify-between my-3'>
            <ul class='flex items-center gap-x-3'>
                <Badge v-for='tag in page?.tags'>#{{ tag.toUpperCase() }}</Badge>
            </ul>
            <span class='text-accent-foreground/75'>
                <Icon name='ic:outline-calendar-today' class='mb-1 mr-1' size='16' />
                {{ $t('news.publishedOn') }} {{ formattedDate }}
            </span>
        </div>
        <ContentRenderer :value='page!' class='text-justify prose max-w-full dark:prose-invert' />
    </main>
</template>

<script setup lang='ts'>
import { Badge } from '~/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb'

const route = useRoute()
const slug = route.params.slug as string
const { data: page } = await useAsyncData(slug, () => {
  return queryCollection('docs').path(`/${slug}`).first()
})

if (!page.value) throw createError({ statusCode: 404 })

const image = computed(() => `/news/${slug}.webp`)

const { locale } = useI18n()
const formattedDate = computed(() => {
  if (!page.value?.date) return ''
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(page.value.date))
})
</script>
