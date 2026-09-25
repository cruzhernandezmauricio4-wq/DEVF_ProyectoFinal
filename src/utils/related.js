// Puntaje de parecido entre dos noticias, al estilo "más como esto" de Pinterest:
// cada etiqueta en común pesa más; misma fuente o misma plataforma suman un poco.
function similarity(base, other) {
  const sharedTags = other.tags.filter((tag) => base.tags.includes(tag)).length
  return sharedTags * 3 + (other.source === base.source ? 1 : 0) + (other.platform === base.platform ? 0.5 : 0)
}

// Devuelve las noticias más parecidas a `base`, sin incluirla.
export function getRelatedNews(base, allNews, limit = 8) {
  return allNews
    .filter((item) => item.id !== base.id)
    .map((item) => ({ item, score: similarity(base, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item)
}
