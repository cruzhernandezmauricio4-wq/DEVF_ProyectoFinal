import { z } from 'zod'

// Respuesta de rss2json. Los items se validan uno por uno en newsService,
// así una noticia mal formada no tira toda la fuente.
export const RssResponseSchema = z.object({
  status: z.literal('ok'),
  items: z.array(z.unknown()),
})

export const RssItemSchema = z.object({
  title: z.string(),
  link: z.url({ protocol: /^https?$/ }),
  guid: z.string().catch(''),
  pubDate: z.string().optional(),
  description: z.string().catch(''),
  thumbnail: z.string().catch(''),
  enclosure: z
    .object({ link: z.string().optional(), thumbnail: z.string().optional() })
    .catch({}),
  categories: z.array(z.string()).catch([]),
})
