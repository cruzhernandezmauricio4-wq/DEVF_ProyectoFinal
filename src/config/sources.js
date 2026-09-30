// Fuentes de noticias que se leen a través de rss2json, agrupadas en tandas.
// La primera tanda se carga al abrir el tablero; las demás, al hacer scroll hacia abajo.
// Para agregar una fuente nueva basta con sumarla a una tanda (o crear una tanda nueva).
export const SOURCE_PAGES = [
  [
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
  ],
  [
    { name: 'Elle', platform: 'web', url: 'https://www.elle.com/rss/all.xml/' },
    { name: 'Glamour', platform: 'web', url: 'https://www.glamour.com/feed/rss' },
  ],
  [
    { name: 'Esquire', platform: 'web', url: 'https://www.esquire.com/rss/style.xml/' },
    { name: 'Cosmopolitan', platform: 'web', url: 'https://www.cosmopolitan.com/rss/style-beauty.xml/' },
  ],
]

// Lista plana de todas las fuentes (la usa `npm run api:check`).
export const RSS_SOURCES = SOURCE_PAGES.flat()

export const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json'

// Opcional: con una clave gratuita de rss2json se pueden pedir más noticias por fuente.
export const RSS2JSON_API_KEY = import.meta.env?.VITE_RSS2JSON_API_KEY ?? ''
