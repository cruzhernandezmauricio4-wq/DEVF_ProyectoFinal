import { RSS_SOURCES } from '../config/sources'
import curatedNews from '../data/news.json'
import { toPlainText } from '../utils/html'
import { extractTags } from '../utils/tags'
import { fetchFeed } from './rssClient'

// Convierte una noticia de rss2json al modelo de noticia de MAU.
function normalizeItem(item, source) {
  const title = toPlainText(item.title)
  const excerpt = toPlainText(item.description).slice(0, 180)
  const image = toPlainText(item.thumbnail || item.enclosure?.thumbnail || item.enclosure?.link || '')

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

// Intercala las noticias de cada fuente para que el tablero se vea variado.
function interleave(groups) {
  const result = []
  const longest = Math.max(0, ...groups.map((group) => group.length))
  for (let i = 0; i < longest; i++) {
    groups.forEach((group) => group[i] && result.push(group[i]))
  }
  return result
}

// Reúne las noticias de todas las fuentes. Si alguna falla, se muestran las demás.
export async function getNews({ signal } = {}) {
  const results = await Promise.allSettled(
    RSS_SOURCES.map((source) =>
      fetchFeed(source.url, { signal }).then((items) =>
        items.map((item) => normalizeItem(item, source)).filter((news) => news.image),
      ),
    ),
  )
  signal?.throwIfAborted()

  const groups = results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
  results
    .filter((r) => r.status === 'rejected')
    .forEach((r) => console.warn('[MAU] Fuente no disponible:', r.reason.message))

  if (groups.length === 0) {
    throw new Error('No se pudo cargar ninguna fuente de noticias.')
  }

  return interleave([...groups, curatedNews])
}
