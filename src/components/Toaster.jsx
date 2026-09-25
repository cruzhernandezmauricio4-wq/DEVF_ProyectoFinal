import './Toaster.css'

const ICONS = { success: '✓', error: '!', info: 'i' }

function Toaster({ notifications, onDismiss }) {
  return (
    <div className="toaster" aria-live="polite">
      {notifications.map(({ id, tone, message }) => (
        <div key={id} className={`toast toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
          <span className="toast__icon" aria-hidden="true">
            {ICONS[tone]}
          </span>
          <p className="toast__message">{message}</p>
          <button type="button" className="toast__close" onClick={() => onDismiss(id)} aria-label="Cerrar aviso">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toaster
