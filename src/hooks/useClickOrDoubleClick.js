import { useCallback, useEffect, useRef } from 'react'

// Distingue un clic de un doble clic en un enlace.
// Un doble clic también dispara dos clics, así que el clic sencillo espera `delay` ms:
// si en ese tiempo llega el segundo clic, se cancela y se ejecuta `onDouble`.
export function useClickOrDoubleClick(onSingle, onDouble, delay = 250) {
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = useCallback(
    (event) => {
      // Teclado (Enter) o abrir en otra pestaña (Ctrl/Cmd/Shift/clic medio): comportamiento normal del enlace.
      if (event.detail === 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      event.preventDefault()
      if (event.detail > 1) return // el segundo clic lo maneja onDoubleClick
      timer.current = setTimeout(onSingle, delay)
    },
    [onSingle, delay],
  )

  const onDoubleClick = useCallback(
    (event) => {
      event.preventDefault()
      clearTimeout(timer.current)
      onDouble()
    },
    [onDouble],
  )

  return { onClick, onDoubleClick }
}
