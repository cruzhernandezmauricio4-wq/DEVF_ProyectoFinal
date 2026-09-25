import PlatformBadge from './PlatformBadge'
import './NewsCard.css'

function NewsCard({ news }) {
  const { title, source, platform, url, image, tags } = news

  return (
    <article className={`news-card news-card--${platform}`}>
      {image && <img className="news-card__image" src={image} alt="" loading="lazy" />}
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
}

export default NewsCard
