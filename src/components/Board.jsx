import { memo } from 'react'
import NewsCard from './NewsCard'
import './Board.css'

// Recibe todas las noticias y el conjunto de las visibles. Las que no coinciden con
// los filtros se ocultan en lugar de desmontarse: como <NewsCard> usa memo, al
// cambiar un filtro ninguna tarjeta se vuelve a dibujar, solo cambia su visibilidad.
// memo: si `items` y `visibleIds` son los mismos (useMemo), se salta el render.
const Board = memo(function Board({ items, visibleIds, stale = false }) {
  return (
    <section className={`board${stale ? ' board--stale' : ''}`} aria-label="Noticias de moda" aria-busy={stale}>
      {items.map((item) => (
        <div key={item.id} className="board__item" hidden={!visibleIds.has(item.id)}>
          <NewsCard news={item} />
        </div>
      ))}
    </section>
  )
})

export default Board
