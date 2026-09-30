import { Profiler } from 'react'
import Board from '../components/Board'
import ErrorState from '../components/ErrorState'
import LoadMore from '../components/LoadMore'
import NewsFilters from '../components/NewsFilters'
import StatusMessage from '../components/StatusMessage'
import { useNews } from '../hooks/useNews'
import { useNewsFilters } from '../hooks/useNewsFilters'
import { getErrorMessage } from '../utils/errors'
import { logRender } from '../utils/profiler'

function Home() {
  const { news, failedSources, loading, loadingMore, error, hasMore, loadMore, retry, reload } = useNews()
  const filters = useNewsFilters(news)

  if (loading) return <StatusMessage>Cargando noticias…</StatusMessage>
  // Si falla la primera tanda no hay nada que mostrar; si falla una posterior,
  // el error se muestra al final del tablero sin perder lo ya cargado.
  if (error && news.length === 0) {
    return (
      <main className="page">
        <ErrorState title="No pudimos cargar las noticias" message={getErrorMessage(error)} onRetry={retry} />
      </main>
    )
  }

  return (
    <main>
      {failedSources.length > 0 && (
        <div className="notice glass" role="status">
          <p>Algunas fuentes no respondieron ({failedSources.join(', ')}). Mostramos el resto.</p>
          <button type="button" className="button button--ghost button--small" onClick={reload}>
            Reintentar
          </button>
        </div>
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
      {filters.filtered.length === 0 && !loadingMore && (
        <p className="board__empty">No hay noticias que coincidan con tu búsqueda.</p>
      )}
      <Profiler id="Board" onRender={logRender}>
        <Board items={news} visibleIds={filters.visibleIds} stale={filters.isStale} />
      </Profiler>
      <LoadMore
        onLoadMore={loadMore}
        hasMore={hasMore}
        loading={loadingMore}
        error={error && getErrorMessage(error)}
        onRetry={retry}
      />
    </main>
  )
}

export default Home
