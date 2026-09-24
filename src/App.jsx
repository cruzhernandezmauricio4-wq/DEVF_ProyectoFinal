import news from './data/news.json'

function App() {
  return (
    <main className="app">
      <h1>MAU</h1>
      <p>Moda for All and U — tablero de noticias de moda en construcción.</p>
      <p>{news.length} noticias cargadas.</p>
    </main>
  )
}

export default App
