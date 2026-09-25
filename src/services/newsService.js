import { RSS_SOURCES } from '../config/sources'
import { NewsSchema } from '../schemas/news'
import { RssItemSchema } from '../schemas/rss'
import { AppError } from '../utils/errors'
import { toPlainText } from '../utils/html'
import { extractTags } from '../utils/tags'
import { getCuratedPosts } from './curatedService'
import { fetchFeed } from './rssClient'

// Convierte una noticia de rss2json al modelo de noticia de MAU.
function normalizeItem(item, source) {
  const title = toPlainText(item.title)
  const excerpt = toPlainText(item.description).slice(0, 180)
  const image = toPlainText(item.thumbnail || item.enclosure.thumbnail || item.enclosure.link || '')

  return {
    id: item.guid || item.link,
    title,
    excerpt,
    source: source.name,
    platform: source.platform,
    url: item.link,
    image,
    date: item.pubDate,
    tags: extractTags(`${title} ${excerpt}`, item.categories),
  }
}

// Valida cada noticia por separado: las que no cumplen el esquema (sin imagen,
// enlace inválido…) se descartan sin afectar al resto de la fuente.
function parseItems(rawItems, source) {
  return rawItems.flatMap((raw) => {
    const item = RssItemSchema.safeParse(raw)
    if (!item.success) return []
    const news = NewsSchema.safeParse(normalizeItem(item.data, source))
    return news.success ? [news.data] : []
  })
}

// Intercala las noticias de cada fuente para que el tablero se vea variado.
function interleave(groups) {
  const result = []
  const longest = Math.max(0, ...groups.map((group) => group.length))
  for (let i = 0; i < longest; i++) {
    groups.forEach((group) => group[i] && result.push(group[i]))
  }
  return result
}

// Reúne las noticias de todas las fuentes. Si alguna falla, se muestran las demás
// y se informa cuáles no respondieron.
export async function getNews({ signal } = {}) {
  const results = await Promise.allSettled(
    RSS_SOURCES.map((source) =>
      fetchFeed(source.url, { signal }).then((items) => parseItems(items, source)),
    ),
  )
  signal?.throwIfAborted()

  const groups = []
  const failedSources = []
  results.forEach((result, i) => {
    const source = RSS_SOURCES[i]
    if (result.status === 'fulfilled') return groups.push(result.value)
    failedSources.push(`${source.name} (${source.platform})`)
    console.warn(`[MAU] ${source.name} no disponible:`, result.reason)
  })

  // Si fallaron todas, se propaga el primer error para mostrar su causa (sin internet, etc.).
  if (groups.length === 0) {
    const firstError = results[0].reason
    throw firstError instanceof AppError
      ? firstError
      : new AppError('network', 'No se pudo cargar ninguna fuente de noticias.', { cause: firstError })
  }

  return { news: interleave([...groups, getCuratedPosts()]), failedSources }
}
