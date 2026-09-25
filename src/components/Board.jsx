import { memo } from 'react'
import NewsCard from './NewsCard'
import './Board.css'

// Recibe todas las noticias y, opcionalmente, el conjunto de las visibles. Las que no
// coinciden con los filtros se ocultan en lugar de desmontarse: como <NewsCard> usa
// memo, al cambiar un filtro ninguna tarjeta se vuelve a dibujar.
// memo: si `items` y `visibleIds` son los mismos (useMemo), se salta el render.
const Board = memo(function Board({ items, visibleIds, stale = false, label = 'Noticias de moda' }) {
  return (
    <section className={`board${stale ? ' board--stale' : ''}`} aria-label={label} aria-busy={stale}>
      {items.map((item) => (
        <div key={item.id} className="board__item" hidden={visibleIds ? !visibleIds.has(item.id) : false}>
          <NewsCard news={item} />
        </div>
      ))}
    </section>
  )
})

export default Board
