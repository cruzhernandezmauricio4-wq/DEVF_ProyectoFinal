import { useCallback, useEffect, useMemo, useState } from 'react'
import { clearNewsCache, getCachedPageCount, getNewsPage, TOTAL_PAGES } from '../services/newsService'

// Carga las noticias por tandas para el scroll infinito.
// - `loadMore` pide la siguiente tanda (se llama al acercarse al final del tablero).
// - `retry` reintenta la tanda que falló; `reload` vuelve a pedir todo desde cero.
export function useNews() {
  const [pages, setPages] = useState([])
  // Al volver al tablero se piden de nuevo (desde la caché) todas las tandas ya vistas.
  const [requested, setRequested] = useState(() => Math.max(1, getCachedPageCount()))
  const [error, setError] = useState(null)
  const [forcedPage, setForcedPage] = useState(null)

  const nextIndex = pages.length
  const pending = nextIndex < requested && !error

  useEffect(() => {
    if (!pending) return
    const controller = new AbortController()

    getNewsPage(nextIndex, { signal: controller.signal, force: forcedPage === nextIndex })
      .then((page) => {
        if (controller.signal.aborted) return
        setPages((current) => (current.length === nextIndex ? [...current, page] : current))
      })
      .catch((err) => {
        // Una carga cancelada (al desmontar o por StrictMode en desarrollo) no es un error real.
        if (!controller.signal.aborted) setError(err)
      })

    return () => controller.abort()
  }, [pending, nextIndex, forcedPage])

  // useMemo: la lista completa solo se arma de nuevo cuando llega una tanda.
  const news = useMemo(() => pages.flatMap((page) => page.news), [pages])
  const failedSources = useMemo(() => pages.flatMap((page) => page.failedSources), [pages])

  const hasMore = pages.length < TOTAL_PAGES

  const loadMore = useCallback(() => {
    setRequested((current) => Math.min(TOTAL_PAGES, Math.max(current, pages.length + 1)))
  }, [pages.length])

  const retry = useCallback(() => {
    setForcedPage(pages.length)
    setError(null)
  }, [pages.length])

  const reload = useCallback(() => {
    clearNewsCache()
    setPages([])
    setRequested(1)
    setForcedPage(null)
    setError(null)
  }, [])

  return {
    news,
    failedSources,
    loading: pending && pages.length === 0,
    loadingMore: pending && pages.length > 0,
    error,
    hasMore,
    loadMore,
    retry,
    reload,
  }
}
