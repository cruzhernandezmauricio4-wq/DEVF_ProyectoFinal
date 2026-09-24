import Board from '../components/Board'
import news from '../data/news.json'

function Home() {
  return (
    <main>
      <Board items={news} />
    </main>
  )
}

export default Home
