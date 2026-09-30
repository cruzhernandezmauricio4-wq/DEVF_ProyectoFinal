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
      <div className="filters__top">
        <label className="filters__search glass glass--strong glass--liquid">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Buscar por título, fuente o etiqueta…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Buscar noticias"
          />
        </label>

        <p className="filters__summary eyebrow" aria-live="polite">
          {shown === total ? `${total} noticias` : `${shown} de ${total} noticias`}
        </p>
      </div>

      {/* Control segmentado: una cápsula de vidrio con la opción elegida resaltada */}
      <div className="filters__strip">
        <div className="segmented glass" role="group" aria-label="Plataforma">
          {PLATFORM_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className="segmented__option"
              aria-pressed={platform === value}
              onClick={() => onPlatformChange(value)}
            >
              {value === 'todas' ? 'Todas' : PLATFORM_LABELS[value].label}
            </button>
          ))}
        </div>
      </div>

      {/* En el celular las etiquetas van en una tira que se desliza de lado */}
      <div className="filters__strip filters__strip--tags" role="group" aria-label="Etiquetas">
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            className="chip"
            aria-pressed={activeTag === tag}
            onClick={() => onTagToggle(tag)}
          >
            #{tag} <span className="chip__count">{count}</span>
          </button>
        ))}
      </div>
    </section>
  )
})

export default NewsFilters
