import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { products } from '../src/data/products.js'
import { projects } from '../src/data/projects.js'
import { journal } from '../src/data/journal.js'

/**
 * Pages has no rewrites, so every client route gets a real directory holding
 * the SPA shell — each canonical URL then answers with a genuine 200 instead
 * of falling back to 404.html.
 */
const STATIC_ROUTES = ['shop', 'projects', 'journal', 'about', 'contact', 'cart', 'wishlist']
const routes = [
  ...STATIC_ROUTES,
  ...products.map((p) => `product/${p.id}`),
  ...projects.map((p) => `projects/${p.id}`),
  ...journal.map((a) => `journal/${a.id}`),
]
const shell = 'dist/index.html'
for (const route of routes) {
  const out = `dist/${route}/index.html`
  mkdirSync(dirname(out), { recursive: true })
  copyFileSync(shell, out)
}
copyFileSync(shell, 'dist/404.html')
writeFileSync('dist/.nojekyll', '')
console.log(`postbuild: prerendered ${routes.length} route shells`)
