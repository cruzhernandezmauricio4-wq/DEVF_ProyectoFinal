import { useCallback, useMemo, useRef, useState } from 'react'
import Toaster from '../components/Toaster'
import { NotificationContext } from './notificationContext'

const DURATION_MS = 5000

// Muestra avisos breves (éxito, error, información) desde cualquier parte de la app.
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const nextId = useRef(0)

  const dismiss = useCallback((id) => {
    setNotifications((current) => current.filter((n) => n.id !== id))
  }, [])

  const notify = useCallback(
    ({ tone = 'info', message }) => {
      const id = ++nextId.current
      setNotifications((current) => [...current, { id, tone, message }])
      setTimeout(() => dismiss(id), DURATION_MS)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster notifications={notifications} onDismiss={dismiss} />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
