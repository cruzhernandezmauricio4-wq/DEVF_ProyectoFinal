// Palabras clave que se buscan en el título y la descripción para etiquetar noticias.
// Estas etiquetas alimentarán las recomendaciones de noticias similares.
const KEYWORDS = {
  pasarela: ['runway', 'ready-to-wear', 'fashion week', 'collection', 'spring 20', 'fall 20'],
  streetwear: ['streetwear', 'sneaker', 'hoodie', 'supreme', 'nike', 'adidas'],
  lujo: ['luxury', 'lvmh', 'kering', 'gucci', 'prada', 'chanel', 'dior', 'hermès', 'louis vuitton'],
  vanguardia: ['rick owens', 'comme des garçons', 'cdg', 'margiela', 'yohji', 'avant-garde', 'marine serre'],
  sustentable: ['sustainab', 'recycled', 'upcycl', 'greenwashing', 'vintage', 'secondhand'],
  belleza: ['beauty', 'makeup', 'hair', 'nail', 'skincare', 'fragrance'],
  celebridades: ['red carpet', 'met gala', 'celebrity', 'arrives', 'gets ready', 'vogue world'],
  compras: ['shopping', 'shop ', 'buy', 'sale', 'outfit ideas'],
  negocios: ['ceo', 'business', 'market', 'acquisition', 'ownership', 'stake'],
  accesorios: ['bag', 'shoe', 'jewelry', 'jewellery', 'watch', 'sunglasses', 'boots'],
}

export function extractTags(text, categories = []) {
  const haystack = text.toLowerCase()
  const tags = Object.entries(KEYWORDS)
    .filter(([, words]) => words.some((word) => haystack.includes(word)))
    .map(([tag]) => tag)

  const categoryTags = categories
    .map((category) => category.toLowerCase().split('/').pop().trim())
    .filter(Boolean)

  return [...new Set([...tags, ...categoryTags])].slice(0, 5)
}
