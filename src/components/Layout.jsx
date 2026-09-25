import { Outlet, useLocation } from 'react-router'
import ErrorBoundary from './ErrorBoundary'
import Header from './Header'

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      {/* La `key` reinicia el ErrorBoundary al cambiar de página. */}
      <ErrorBoundary key={pathname}>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default Layout
