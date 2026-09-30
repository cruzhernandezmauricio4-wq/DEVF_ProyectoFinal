// Filtro SVG de la refracción del vidrio líquido, basado en las recreaciones web de
// Liquid Glass (lucasromerodb/liquid-glass-effect-macos y shuding/liquid-glass):
// 1. feTurbulence genera un ruido suave, como la superficie irregular de un cristal.
// 2. feGaussianBlur lo alisa para que la deformación sea líquida y no granulada.
// 3. feDisplacementMap mueve los píxeles del fondo según ese ruido (la refracción).
// Se dibuja una sola vez; cualquier capa lo usa con `filter: url(#mau-liquid)`.
// No se oculta con display:none porque algunos navegadores ignoran esos filtros.
function LiquidGlassFilter() {
  return (
    <svg className="liquid-glass-filter" width="0" height="0" aria-hidden="true" focusable="false">
      <filter
        id="mau-liquid"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="70" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

export default LiquidGlassFilter
