import { Profiler } from 'react'
import Board from '../components/Board'
import ErrorState from '../components/ErrorState'
import NewsFilters from '../components/NewsFilters'
import StatusMessage from '../components/StatusMessage'
import { useNews } from '../hooks/useNews'
import { useNewsFilters } from '../hooks/useNewsFilters'
import { getErrorMessage } from '../utils/errors'
import { logRender } from '../utils/profiler'

function Home() {
  const { news, failedSources, loading, error, retry } = useNews()
  const filters = useNewsFilters(news)

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
        <p className="notice glass" role="status">
          Algunas fuentes no respondieron ({failedSources.join(', ')}). Mostramos el resto.{' '}
          <button type="button" className="button button--ghost" onClick={retry}>
            Reintentar
          </button>
        </p>
      )}
      <NewsFilters
        query={filters.query}
        onQueryChange={filters.setQuery}
        platform={filters.platform}
        onPlatformChange={filters.setPlatform}
        tags={filters.tags}
        activeTag={filters.activeTag}
        onTagToggle={filters.toggleTag}
        total={news.length}
        shown={filters.filtered.length}
      />
      {filters.filtered.length === 0 && (
        <p className="board__empty">No hay noticias que coincidan con tu búsqueda.</p>
      )}
      <Profiler id="Board" onRender={logRender}>
        <Board items={news} visibleIds={filters.visibleIds} stale={filters.isStale} />
      </Profiler>
    </main>
  )
}

export default Home
