import './PlatformBadge.css'

const PLATFORMS = {
  web: { label: 'Revista', icon: '📰' },
  youtube: { label: 'YouTube', icon: '▶️' },
  tiktok: { label: 'TikTok', icon: '🎵' },
  instagram: { label: 'Instagram', icon: '📸' },
}

function PlatformBadge({ platform }) {
  const { label, icon } = PLATFORMS[platform] ?? PLATFORMS.web

  return (
    <span className={`platform-badge platform-badge--${platform}`}>
      <span aria-hidden="true">{icon}</span> {label}
    </span>
  )
}

export default PlatformBadge
