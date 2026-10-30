import { fileURLToPath } from 'node:url'
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: { include: '**', cwd: fileURLToPath(new URL('news', import.meta.url)) },
      schema: z.object({
        date: z.date(),
        updatedAt: z.date().optional(),
        tags: z.array(z.string()),
        description: z.string(),
        sitemap: defineSitemapSchema({
          z,
          name: 'docs',
          onUrl: (url) => {
            url.loc = `/news${url.loc}`
          }
        })
      })
    })
  }
})
