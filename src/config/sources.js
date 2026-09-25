// Fuentes de noticias que se leen a través de rss2json.
// Para agregar una fuente nueva basta con sumar un objeto a esta lista.
export const RSS_SOURCES = [
  { name: 'Vogue', platform: 'web', url: 'https://www.vogue.com/feed/rss' },
  {
    name: 'Vogue',
    platform: 'youtube',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCRXiA3h1no_PFkb1JCP0yMA',
  },
  { name: 'Dazed', platform: 'web', url: 'https://www.dazeddigital.com/rss' },
  { name: 'Hypebeast', platform: 'web', url: 'https://hypebeast.com/feed' },
  { name: "Harper's Bazaar", platform: 'web', url: 'https://www.harpersbazaar.com/rss/all.xml/' },
  { name: 'Fashionista', platform: 'web', url: 'https://fashionista.com/.rss/full/' },
]

export const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json'

// Opcional: con una clave gratuita de rss2json se pueden pedir más noticias por fuente.
export const RSS2JSON_API_KEY = import.meta.env?.VITE_RSS2JSON_API_KEY ?? ''
