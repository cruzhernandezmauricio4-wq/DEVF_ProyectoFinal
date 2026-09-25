import { RSS2JSON_API_KEY, RSS2JSON_ENDPOINT } from '../config/sources'

// Pide un feed RSS a rss2json y devuelve sus noticias en crudo.
export async function fetchFeed(feedUrl, { signal } = {}) {
  const params = new URLSearchParams({ rss_url: feedUrl })
  if (RSS2JSON_API_KEY) {
    params.set('api_key', RSS2JSON_API_KEY)
    params.set('count', '20')
  }

  const response = await fetch(`${RSS2JSON_ENDPOINT}?${params}`, { signal })
  if (!response.ok) {
    throw new Error(`rss2json respondió ${response.status} para ${feedUrl}`)
  }

  const data = await response.json()
  if (data.status !== 'ok') {
    throw new Error(data.message ?? `No se pudo leer ${feedUrl}`)
  }

  return data.items
}
