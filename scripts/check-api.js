// Solicitud de muestra: valida desde la terminal que cada fuente responde.
// Uso: npm run api:check
import { RSS2JSON_ENDPOINT, RSS_SOURCES } from '../src/config/sources.js'

console.log(`Probando ${RSS_SOURCES.length} fuentes en ${RSS2JSON_ENDPOINT}\n`)

const results = await Promise.all(
  RSS_SOURCES.map(async (source) => {
    const params = new URLSearchParams({ rss_url: source.url })
    try {
      const response = await fetch(`${RSS2JSON_ENDPOINT}?${params}`)
      const data = await response.json()
      if (data.status !== 'ok') throw new Error(data.message)
      return { source, ok: true, count: data.items.length, sample: data.items[0]?.title }
    } catch (error) {
      return { source, ok: false, error: error.message }
    }
  }),
)

for (const { source, ok, count, sample, error } of results) {
  const label = `${source.name} (${source.platform})`.padEnd(26)
  console.log(ok ? `✔ ${label} ${count} noticias · "${sample}"` : `✘ ${label} ${error}`)
}

const failed = results.filter((r) => !r.ok).length
console.log(`\n${results.length - failed}/${results.length} fuentes disponibles`)
process.exitCode = failed === results.length ? 1 : 0
