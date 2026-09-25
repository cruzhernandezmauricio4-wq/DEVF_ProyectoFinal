import { PLATFORM_LABELS } from '../config/platforms'
import './PlatformBadge.css'

// Íconos de línea genéricos (no logotipos de marca) para cada tipo de contenido.
const ICONS = {
  web: <path d="M4 5h12v14H6a2 2 0 0 1-2-2V5Zm12 4h4v8a2 2 0 0 1-2 2h-2M7 9h6M7 13h6M7 16h4" />,
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m10 9.5 4.5 2.5-4.5 2.5v-5Z" />
    </>
  ),
  tiktok: <path d="M9 18a2.5 2.5 0 1 1-2.5-2.5M9 18V5l9-2v12M18 15a2.5 2.5 0 1 1-2.5-2.5" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.6" />
    </>
  ),
}

function PlatformBadge({ platform }) {
  const key = PLATFORM_LABELS[platform] ? platform : 'web'
  const { label } = PLATFORM_LABELS[key]

  return (
    <span className={`platform-badge platform-badge--${key}`}>
      <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
        {ICONS[key]}
      </svg>
      {label}
    </span>
  )
}

export default PlatformBadge
