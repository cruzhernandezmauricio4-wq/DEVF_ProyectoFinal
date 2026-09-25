import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pruebas con Vitest (https://vitest.dev). jsdom simula el navegador (DOMParser, localStorage…).
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js'],
  },
})
