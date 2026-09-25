import curatedJson from '../data/news.json'
import { NewsSchema } from '../schemas/news'
import { AppError } from '../utils/errors'

const STORAGE_KEY = 'mau.curated'

// Valida una lista de posts y descarta los que no cumplen el modelo de noticia.
function keepValid(items, origin) {
  if (!Array.isArray(items)) return []
  return items.flatMap((item) => {
    const result = NewsSchema.safeParse(item)
    if (result.success) return [result.data]
    console.warn(`[MAU] Post inválido en ${origin}:`, item?.id, result.error.issues[0]?.message)
    return []
  })
}

const basePosts = keepValid(curatedJson, 'news.json')

function loadStoredPosts() {
  try {
    return keepValid(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'), 'localStorage')
  } catch {
    return []
  }
}

// Posts curados: los del archivo del proyecto más los agregados desde el panel.
export function getCuratedPosts() {
  return [...loadStoredPosts(), ...basePosts]
}

// Recibe los datos ya validados por CuratedPostFormSchema.
export function addCuratedPost({ title, platform, url, image, tags }) {
  const post = NewsSchema.parse({
    id: `local-${Date.now()}`,
    title,
    excerpt: '',
    source: 'MAU',
    platform,
    url,
    image,
    date: new Date().toISOString(),
    tags,
  })

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([post, ...loadStoredPosts()]))
  } catch (error) {
    throw new AppError('storage', 'No se pudo guardar el post en este navegador.', { cause: error })
  }
  return post
}
