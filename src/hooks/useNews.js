import { useCallback, useEffect, useState } from 'react'
import { getNews } from '../services/newsService'

// Carga las noticias y expone los estados de carga y error, más `retry` para reintentar.
export function useNews() {
  const [news, setNews] = useState([])
  const [failedSources, setFailedSources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getNews({ signal: controller.signal })
      .then((result) => {
        if (controller.signal.aborted) return
        setNews(result.news)
        setFailedSources(result.failedSources)
      })
      .catch((err) => {
        // Una carga cancelada (al desmontar o por StrictMode en desarrollo) no es un error real.
        if (!controller.signal.aborted) setError(err)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setLoading(true)
    setError(null)
    setAttempt((n) => n + 1)
  }, [])

  return { news, failedSources, loading, error, retry }
}
