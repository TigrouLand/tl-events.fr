<template>
    <main class='mx-auto max-w-5xl px-4 py-8 mt-32'>
        <Breadcrumb class='mb-3'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as='a' href='/'>
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

        <NuxtImg :src='image' :alt='page?.title' width='1920' height='1080' draggable='false' class='select-none w-full aspect-video object-cover rounded-xl shadow-xl' />
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
import { APP_NAME, FULL_APP_NAME, PROD_URL } from '~/tools/seo'

const route = useRoute()
const slug = route.params.slug as string
const { data: page } = await useAsyncData(slug, () => {
  return queryCollection('docs').path(`/${slug}`).first()
})

if (!page.value) throw createError({ statusCode: 404 })

const image = computed(() => `/news/${slug}.webp`)

const { locale, t } = useI18n()
const localePath = useLocalePath()

useHead({ title: page.value.title })

const absolute = (path: string) => new URL(localePath(path), PROD_URL).href
const articleURL = new URL(route.path, PROD_URL).href
const publishedAt = new Date(page.value.date).toISOString()

useSeoMeta({
  description: page.value.description,
  ogTitle: `${APP_NAME} > ${t('news.title')} > ${page.value.title}`,
  ogDescription: page.value.description,
  ogImageAlt: page.value.title,
  ogUrl: articleURL,
  ogType: 'article',
  articlePublishedTime: publishedAt,
  articleModifiedTime: publishedAt,
  articleAuthor: [FULL_APP_NAME],
  articleSection: t('news.title'),
  articleTag: page.value.tags
})
defineOgImage('BlogPost.takumi', {
  title: page.value.title,
  description: page.value.description,
  image: image.value
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'NewsArticle',
            '@id': articleURL,
            headline: page.value.title,
            description: page.value.description,
            image: [new URL(image.value, PROD_URL).href],
            datePublished: publishedAt,
            dateModified: publishedAt,
            inLanguage: locale.value,
            articleSection: page.value.tags,
            keywords: page.value.tags.join(', '),
            isAccessibleForFree: true,
            author: { '@type': 'Organization', name: FULL_APP_NAME, url: PROD_URL },
            publisher: {
              '@type': 'Organization',
              name: FULL_APP_NAME,
              url: PROD_URL,
              logo: { '@type': 'ImageObject', url: `${PROD_URL}/logo.webp` }
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': articleURL }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: t('home'), item: absolute('/') },
              { '@type': 'ListItem', position: 2, name: t('news.title'), item: absolute('/news') },
              { '@type': 'ListItem', position: 3, name: page.value.title, item: articleURL }
            ]
          }
        ]
      })
    }
  ]
})

const formattedDate = computed(() => {
  if (!page.value?.date) return ''
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(page.value.date))
})
</script>
