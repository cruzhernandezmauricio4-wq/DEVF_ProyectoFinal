import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import ErrorBoundary from './ErrorBoundary'
import Header from './Header'
import StatusMessage from './StatusMessage'

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      {/* La `key` reinicia el ErrorBoundary al cambiar de página. */}
      <ErrorBoundary key={pathname}>
        {/* Mientras se descarga una página con React.lazy, el header sigue visible. */}
        <Suspense fallback={<StatusMessage>Cargando…</StatusMessage>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Layout
