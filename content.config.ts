import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: { include: '**', cwd: './news' },
      schema: z.object({
        date: z.date(),
        updatedAt: z.date().optional(),
        tags: z.array(z.string()),
        description: z.string(),
        // declaring the field is what opts the collection into the sitemap; onUrl is needed because
        // the document path carries no /news prefix while the route does
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
