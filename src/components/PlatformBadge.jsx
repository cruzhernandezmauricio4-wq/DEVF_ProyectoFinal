import { PLATFORM_LABELS } from '../config/platforms'
import './PlatformBadge.css'

function PlatformBadge({ platform }) {
  const { label, icon } = PLATFORM_LABELS[platform] ?? PLATFORM_LABELS.web

  return (
    <span className={`platform-badge platform-badge--${platform}`}>
      <span aria-hidden="true">{icon}</span> {label}
    </span>
  )
}

export default PlatformBadge
