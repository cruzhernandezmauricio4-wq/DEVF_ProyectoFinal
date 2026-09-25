import { memo } from 'react'
import PlatformBadge from './PlatformBadge'
import './NewsCard.css'

// memo: una tarjeta solo se vuelve a dibujar si cambia su noticia. Al filtrar, las
// tarjetas que siguen visibles no se recalculan.
const NewsCard = memo(function NewsCard({ news }) {
  const { title, source, platform, url, image, tags } = news

  return (
    <article className={`news-card news-card--${platform}`}>
      {image && <img className="news-card__image" src={image} alt="" loading="lazy" decoding="async" />}
      <div className="news-card__body">
        <div className="news-card__meta">
          <span className="news-card__source">{source}</span>
          <PlatformBadge platform={platform} />
        </div>
        <h2 className="news-card__title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        {tags.length > 0 && (
          <ul className="news-card__tags">
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
})

export default NewsCard
