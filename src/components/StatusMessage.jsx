import './StatusMessage.css'

function StatusMessage({ children, tone = 'info' }) {
  return (
    <p
      className={`status-message status-message--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {children}
    </p>
  )
}

export default StatusMessage
