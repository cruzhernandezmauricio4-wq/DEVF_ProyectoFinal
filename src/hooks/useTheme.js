import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mau.theme'
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

function storedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// Tema actual (claro u oscuro). `public/theme-init.js` lo aplica antes de pintar la
// página; aquí se cambia con el botón y se recuerda en este navegador. Mientras el
// usuario no elija, el tema sigue al del sistema, incluso si cambia con la app abierta.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'light')

  useEffect(() => {
    const query = darkQuery()
    const followSystem = () => {
      if (storedTheme()) return
      const next = query.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    query.addEventListener('change', followSystem)
    return () => query.removeEventListener('change', followSystem)
  }, [])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento, el tema dura hasta recargar.
    }
    setTheme(next)
  }, [theme])

  return { theme, toggle }
}
