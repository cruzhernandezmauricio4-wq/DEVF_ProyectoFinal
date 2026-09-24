import NewsCard from './NewsCard'
import './Board.css'

function Board({ items }) {
  return (
    <section className="board" aria-label="Noticias de moda">
      {items.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </section>
  )
}

export default Board
