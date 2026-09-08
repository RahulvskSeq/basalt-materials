import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Production is served from a GitHub Pages project sub-path. */
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/basalt-materials/' : '/',
  server: { port: 5182, host: true },
}))
