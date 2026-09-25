import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router'
import Board from '../components/Board'
import ErrorState from '../components/ErrorState'
import PlatformBadge from '../components/PlatformBadge'
import StatusMessage from '../components/StatusMessage'
import { useNews } from '../hooks/useNews'
import { getErrorMessage } from '../utils/errors'
import { getRelatedNews } from '../utils/related'
import './NewsDetail.css'

const dateFormat = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' })

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : dateFormat.format(date)
}

// Página de una noticia: la noticia en grande, enlace a la fuente y noticias relacionadas.
function NewsDetail() {
  const { id } = useParams()
  const { news, loading, error, retry } = useNews()

  const item = useMemo(() => news.find((n) => n.id === id), [news, id])
  // useMemo: el cálculo de parecido recorre todas las noticias; solo se repite al cambiar de noticia.
  const related = useMemo(() => (item ? getRelatedNews(item, news, 12) : []), [item, news])

  // Al abrir otra noticia desde las relacionadas, se regresa arriba.
  // Con llaves: scrollTo puede regresar una Promise y un efecto solo debe regresar su limpieza.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (loading) return <StatusMessage>Cargando noticia…</StatusMessage>
  if (error) {
    return (
      <main className="page">
        <ErrorState title="No pudimos cargar la noticia" message={getErrorMessage(error)} onRetry={retry} showHomeLink />
      </main>
    )
  }
  if (!item) {
    return (
      <main className="page">
        <ErrorState
          title="Noticia no disponible"
          message="Esta noticia ya no está entre las más recientes de sus fuentes."
          showHomeLink
        />
      </main>
    )
  }

  const date = item.date && formatDate(item.date)

  return (
    <main className="page news-detail">
      <Link to="/" className="news-detail__back">
        ← Volver al tablero
      </Link>

      <article className="news-detail__hero glass">
        <div className="news-detail__media">
          <img src={item.image} alt="" />
        </div>
        <div className="news-detail__body">
          <div className="news-detail__meta">
            <span className="news-detail__source">{item.source}</span>
            <PlatformBadge platform={item.platform} />
            {date && <time dateTime={item.date}>{date}</time>}
          </div>
          <h1 className="news-detail__title">{item.title}</h1>
          {item.excerpt && <p className="news-detail__excerpt">{item.excerpt}</p>}
          {item.tags.length > 0 && (
            <ul className="news-detail__tags" aria-label="Etiquetas">
              {item.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
          <a className="button news-detail__cta" href={item.url} target="_blank" rel="noopener noreferrer">
            Ir a la noticia original ↗
          </a>
        </div>
      </article>

      <section className="news-detail__related">
        <h2 className="news-detail__related-title">
          Más como <em>esto</em>
        </h2>
        {related.length > 0 ? (
          <Board items={related} label="Noticias relacionadas" />
        ) : (
          <p className="news-detail__empty">Todavía no hay noticias parecidas a esta.</p>
        )}
      </section>
    </main>
  )
}

export default NewsDetail
