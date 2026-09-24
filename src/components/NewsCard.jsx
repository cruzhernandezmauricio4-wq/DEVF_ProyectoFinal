import PlatformBadge from './PlatformBadge'
import './NewsCard.css'

function NewsCard({ news }) {
  const { title, platform, url, image, tags } = news

  return (
    <article className="news-card">
      {image && <img className="news-card__image" src={image} alt="" loading="lazy" />}
      <div className="news-card__body">
        <PlatformBadge platform={platform} />
        <h2 className="news-card__title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <ul className="news-card__tags">
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default NewsCard
