import { useCallback, useDeferredValue, useMemo, useState } from 'react'

const MAX_TAGS = 12

// Estado y resultado de los filtros del tablero (texto, plataforma y etiqueta).
export function useNewsFilters(news) {
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState('todas')
  const [activeTag, setActiveTag] = useState(null)

  // useDeferredValue: el input se actualiza al instante y el filtrado del tablero
  // se hace con prioridad baja, así escribir nunca se siente trabado.
  const deferredQuery = useDeferredValue(query)

  // useMemo: el texto de búsqueda de cada noticia se arma una sola vez por lista,
  // no en cada tecla.
  const searchIndex = useMemo(
    () => news.map((item) => `${item.title} ${item.source} ${item.tags.join(' ')}`.toLowerCase()),
    [news],
  )

  // useMemo: las etiquetas más usadas solo cambian cuando cambian las noticias.
  const tags = useMemo(() => {
    const counts = new Map()
    news.forEach((item) => item.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)))
    return [...counts]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, MAX_TAGS)
  }, [news])

  // useMemo: la lista filtrada conserva la misma referencia mientras los filtros no
  // cambien, lo que permite a <Board> (memo) saltarse renders innecesarios.
  const filtered = useMemo(() => {
    const text = deferredQuery.trim().toLowerCase()
    return news.filter(
      (item, i) =>
        (platform === 'todas' || item.platform === platform) &&
        (!activeTag || item.tags.includes(activeTag)) &&
        (!text || searchIndex[i].includes(text)),
    )
  }, [news, searchIndex, platform, activeTag, deferredQuery])

  // useMemo: conjunto de ids visibles. El tablero conserva todas las tarjetas montadas
  // y solo oculta las que no coinciden, así quitar un filtro no vuelve a crearlas.
  const visibleIds = useMemo(() => new Set(filtered.map((item) => item.id)), [filtered])

  // useCallback: funciones estables para que <NewsFilters> (memo) no se vuelva a
  // dibujar solo porque Home se renderizó.
  const toggleTag = useCallback((tag) => setActiveTag((current) => (current === tag ? null : tag)), [])

  return {
    query,
    setQuery,
    platform,
    setPlatform,
    activeTag,
    toggleTag,
    tags,
    filtered,
    visibleIds,
    isStale: query !== deferredQuery,
  }
}
