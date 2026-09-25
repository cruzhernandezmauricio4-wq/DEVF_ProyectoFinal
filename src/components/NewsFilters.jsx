import { memo } from 'react'
import { PLATFORM_LABELS } from '../config/platforms'
import './NewsFilters.css'

const PLATFORM_OPTIONS = ['todas', ...Object.keys(PLATFORM_LABELS)]

// Buscador y filtros del tablero: texto, plataforma y etiqueta.
// memo: solo se vuelve a dibujar si cambia alguna de sus props.
const NewsFilters = memo(function NewsFilters({
  query,
  onQueryChange,
  platform,
  onPlatformChange,
  tags,
  activeTag,
  onTagToggle,
  total,
  shown,
}) {
  return (
    <section className="filters" aria-label="Filtrar noticias">
      <input
        type="search"
        className="filters__search"
        placeholder="Buscar por título, fuente o etiqueta…"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        aria-label="Buscar noticias"
      />

      <div className="filters__group" role="group" aria-label="Plataforma">
        {PLATFORM_OPTIONS.map((value) => (
          <button
            key={value}
            type="button"
            className="chip"
            aria-pressed={platform === value}
            onClick={() => onPlatformChange(value)}
          >
            {value === 'todas' ? 'Todas' : PLATFORM_LABELS[value].label}
          </button>
        ))}
      </div>

      <div className="filters__group" role="group" aria-label="Etiquetas">
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            className="chip chip--tag"
            aria-pressed={activeTag === tag}
            onClick={() => onTagToggle(tag)}
          >
            #{tag} <span className="chip__count">{count}</span>
          </button>
        ))}
      </div>

      <p className="filters__summary" aria-live="polite">
        {shown === total ? `${total} noticias` : `${shown} de ${total} noticias`}
      </p>
    </section>
  )
})

export default NewsFilters
