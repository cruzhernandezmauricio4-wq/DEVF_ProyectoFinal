import { useEffect, useState } from 'react'
import { getNews } from '../services/newsService'

// Carga las noticias y expone los estados de carga y error.
export function useNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    getNews({ signal: controller.signal })
      .then(setNews)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { news, loading, error }
}
