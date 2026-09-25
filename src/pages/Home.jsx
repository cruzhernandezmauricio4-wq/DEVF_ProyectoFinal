import Board from '../components/Board'
import StatusMessage from '../components/StatusMessage'
import { useNews } from '../hooks/useNews'

function Home() {
  const { news, loading, error } = useNews()

  if (loading) return <StatusMessage>Cargando noticias…</StatusMessage>
  if (error) return <StatusMessage tone="error">{error.message}</StatusMessage>

  return (
    <main>
      <Board items={news} />
    </main>
  )
}

export default Home
