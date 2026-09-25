import Board from '../components/Board'
import ErrorState from '../components/ErrorState'
import StatusMessage from '../components/StatusMessage'
import { useNews } from '../hooks/useNews'
import { getErrorMessage } from '../utils/errors'

function Home() {
  const { news, failedSources, loading, error, retry } = useNews()

  if (loading) return <StatusMessage>Cargando noticias…</StatusMessage>
  if (error) {
    return (
      <main className="page">
        <ErrorState title="No pudimos cargar las noticias" message={getErrorMessage(error)} onRetry={retry} />
      </main>
    )
  }

  return (
    <main>
      {failedSources.length > 0 && (
        <p className="notice" role="status">
          Algunas fuentes no respondieron ({failedSources.join(', ')}). Mostramos el resto.{' '}
          <button type="button" className="button button--ghost" onClick={retry}>
            Reintentar
          </button>
        </p>
      )}
      <Board items={news} />
    </main>
  )
}

export default Home
