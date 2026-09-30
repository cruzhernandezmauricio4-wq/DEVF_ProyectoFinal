import { useEffect, useRef } from 'react'
import './LoadMore.css'

// Final del tablero: detecta cuándo el usuario se acerca (IntersectionObserver) y pide
// más noticias. También muestra el estado: cargando, error o fin de las noticias.
function LoadMore({ onLoadMore, hasMore, loading, error, onRetry }) {
  const sentinel = useRef(null)
  const active = hasMore && !loading && !error

  useEffect(() => {
    if (!active || !sentinel.current) return
    // Empieza a cargar antes de llegar al final (1,200 px antes) para que no se note la espera.
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onLoadMore(),
      { rootMargin: '0px 0px 1200px 0px' },
    )
    observer.observe(sentinel.current)
    return () => observer.disconnect()
  }, [active, onLoadMore])

  return (
    <div ref={sentinel} className="load-more" aria-live="polite">
      {loading && (
        <p className="load-more__status">
          <span className="load-more__spinner" aria-hidden="true" />
          Cargando más noticias…
        </p>
      )}
      {error && (
        <p className="load-more__status">
          No pudimos traer más noticias.
          <button type="button" className="button button--ghost" onClick={onRetry}>
            Reintentar
          </button>
        </p>
      )}
      {!hasMore && (
        <p className="load-more__end">
          <span>✦</span> Ya viste todas las noticias de hoy <span>✦</span>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Volver arriba
          </button>
        </p>
      )}
    </div>
  )
}

export default LoadMore
