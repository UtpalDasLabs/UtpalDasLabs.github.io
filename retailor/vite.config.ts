import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served at https://<user>.github.io/retailor/ — base must match the subpath.
export default defineConfig({
  base: '/retailor/',
  plugins: [react()],
  // Explicit empty PostCSS config so the parent repo's postcss.config.js
  // (Tailwind) is not picked up for this nested app.
  css: { postcss: { plugins: [] } },
})
