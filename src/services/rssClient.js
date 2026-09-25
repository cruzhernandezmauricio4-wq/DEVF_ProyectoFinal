import { RSS2JSON_API_KEY, RSS2JSON_ENDPOINT } from '../config/sources'
import { RssResponseSchema } from '../schemas/rss'
import { requestJson } from './httpClient'

// Pide un feed RSS a rss2json y devuelve sus noticias en crudo (sin validar una por una).
export async function fetchFeed(feedUrl, { signal } = {}) {
  const params = new URLSearchParams({ rss_url: feedUrl })
  if (RSS2JSON_API_KEY) {
    params.set('api_key', RSS2JSON_API_KEY)
    params.set('count', '20')
  }

  const data = await requestJson(`${RSS2JSON_ENDPOINT}?${params}`, {
    signal,
    schema: RssResponseSchema,
  })
  return data.items
}
