import { memo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { useClickOrDoubleClick } from '../hooks/useClickOrDoubleClick'
import { newsPath } from '../utils/routes'
import PlatformBadge from './PlatformBadge'
import './NewsCard.css'

// El reflejo de luz sigue al cursor. Se escribe directo en el estilo del elemento
// para no provocar renders de React en cada movimiento del mouse.
function moveHighlight(event) {
  const card = event.currentTarget.parentElement
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
  card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
}

// Estado de la imagen en un atributo, también sin renders: `loaded` la hace aparecer
// con un fundido y `error` muestra un respaldo con el nombre de la fuente.
function markImage(event) {
  event.currentTarget.dataset.state = event.type === 'error' ? 'error' : 'loaded'
}

// Si la imagen ya estaba en la caché del navegador, puede terminar de cargar antes de
// que React conecte onLoad; este ref lo detecta al montar.
function checkCached(img) {
  if (img?.complete && img.naturalWidth > 0) img.dataset.state = 'loaded'
}

// Un clic abre la noticia en MAU (con relacionadas); doble clic abre la fuente original.
// memo: una tarjeta solo se vuelve a dibujar si cambia su noticia. Al filtrar, las
// tarjetas que siguen visibles no se recalculan.
const NewsCard = memo(function NewsCard({ news, priority = false }) {
  const { id, title, source, platform, url, image } = news
  const navigate = useNavigate()
  const detailPath = newsPath(id)

  const openDetail = useCallback(() => navigate(detailPath), [navigate, detailPath])
  const openOriginal = useCallback(() => window.open(url, '_blank', 'noopener,noreferrer'), [url])
  const clicks = useClickOrDoubleClick(openDetail, openOriginal)

  return (
    <article className={`news-card news-card--${platform}`}>
      <Link
        to={detailPath}
        className="news-card__link"
        title="Clic: ver noticia y relacionadas · Doble clic: ir a la fuente"
        onPointerMove={moveHighlight}
        {...clicks}
      >
        <div className="news-card__media">
          <img
            ref={checkCached}
            className="news-card__image"
            src={image}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onLoad={markImage}
            onError={markImage}
          />
          <span className="news-card__fallback" aria-hidden="true">
            {source}
          </span>
          {/* Los videos llevan un botón de reproducir de vidrio sobre la miniatura */}
          {platform === 'youtube' && (
            <span className="news-card__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M8 5.8v12.4a.8.8 0 0 0 1.2.7l10-6.2a.8.8 0 0 0 0-1.4l-10-6.2a.8.8 0 0 0-1.2.7Z" />
              </svg>
            </span>
          )}
        </div>
        <div className="news-card__caption glass glass--strong">
          <div className="news-card__meta">
            <span className="news-card__source eyebrow">{source}</span>
            <PlatformBadge platform={platform} />
          </div>
          <h2 className="news-card__title">{title}</h2>
        </div>
      </Link>
    </article>
  )
})

export default NewsCard
