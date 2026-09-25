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

// Un clic abre la noticia en MAU (con relacionadas); doble clic abre la fuente original.
// memo: una tarjeta solo se vuelve a dibujar si cambia su noticia. Al filtrar, las
// tarjetas que siguen visibles no se recalculan.
const NewsCard = memo(function NewsCard({ news }) {
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
        <img className="news-card__image" src={image} alt="" loading="lazy" decoding="async" />
        <div className="news-card__caption">
          <div className="news-card__meta">
            <span className="news-card__source">{source}</span>
            <PlatformBadge platform={platform} />
          </div>
          <h2 className="news-card__title">{title}</h2>
        </div>
      </Link>
    </article>
  )
})

export default NewsCard
