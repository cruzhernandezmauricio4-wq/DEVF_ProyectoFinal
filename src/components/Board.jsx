import { memo } from 'react'
import NewsCard from './NewsCard'
import './Board.css'

// Las primeras tarjetas se ven sin hacer scroll: su imagen se pide de inmediato y con
// prioridad alta. Las demás esperan a acercarse a la pantalla (loading="lazy").
const PRIORITY_CARDS = 6

// Recibe todas las noticias y, opcionalmente, el conjunto de las visibles. Las que no
// coinciden con los filtros se ocultan en lugar de desmontarse: como <NewsCard> usa
// memo, al cambiar un filtro ninguna tarjeta se vuelve a dibujar.
// memo: si `items` y `visibleIds` son los mismos (useMemo), se salta el render.
const Board = memo(function Board({ items, visibleIds, stale = false, label = 'Noticias de moda' }) {
  return (
    <section className={`board${stale ? ' board--stale' : ''}`} aria-label={label} aria-busy={stale}>
      {items.map((item, index) => (
        <div key={item.id} className="board__item" hidden={visibleIds ? !visibleIds.has(item.id) : false}>
          <NewsCard news={item} priority={index < PRIORITY_CARDS} />
        </div>
      ))}
    </section>
  )
})

export default Board
