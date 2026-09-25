import { Component } from 'react'
import ErrorState from './ErrorState'

// Atrapa errores de renderizado para que una página rota no deje la app en blanco.
// Solo los componentes de clase pueden ser Error Boundaries en React.
class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[MAU] Error de renderizado:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorState
          title="Algo salió mal"
          message="Esta sección tuvo un problema inesperado. Puedes intentarlo de nuevo o volver al tablero."
          onRetry={() => this.setState({ error: null })}
          showHomeLink
        />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
