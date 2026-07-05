import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: { include: '**', cwd: './news' },
      schema: z.object({
        date: z.date(),
        tags: z.array(z.string()),
        description: z.string()
      })
    })
  }
})
