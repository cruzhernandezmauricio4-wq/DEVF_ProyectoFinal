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
      .then((items) => {
        if (!controller.signal.aborted) setNews(items)
      })
      .catch((err) => {
        // Una carga cancelada (al desmontar o por StrictMode en desarrollo) no es un error real.
        if (!controller.signal.aborted) setError(err)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { news, loading, error }
}
