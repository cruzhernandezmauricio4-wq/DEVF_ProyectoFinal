// Se ejecuta antes de que se pinte la página. Es un archivo aparte, y no un <script>
// en línea, porque la política de seguridad del sitio solo permite scripts propios.
//
// 1. Tema: aplica el que eligió el usuario o, si no eligió, el del sistema. Así no se ve
//    un destello del tema equivocado y los colores oscuros viven en un solo bloque de CSS.
// 2. Refracción del vidrio líquido: solo los navegadores Chromium (Chrome, Edge, Opera)
//    dibujan bien un filtro SVG sobre una capa con backdrop-filter. En Safari y Firefox
//    ese filtro borra el desenfoque, así que ahí se queda el vidrio esmerilado normal.
//    `navigator.userAgentData` solo existe en Chromium.
var root = document.documentElement
var theme = null
try {
  theme = localStorage.getItem('mau.theme')
} catch {
  // Sin almacenamiento disponible: se usa el tema del sistema.
}
if (theme !== 'light' && theme !== 'dark') {
  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
root.dataset.theme = theme
if (navigator.userAgentData) root.classList.add('liquid-refraction')
