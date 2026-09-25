import { z } from 'zod'

// Zod intenta acelerar las validaciones generando código con `new Function` (eval).
// La política de seguridad del sitio (CSP en vercel.json) prohíbe eval, así que se
// desactiva: Zod valida igual, solo sin ese atajo.
z.config({ jitless: true })
