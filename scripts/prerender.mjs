// Runs after `vite build`: writes one static HTML file per page/language,
// plus the root redirect page, sitemap.xml and robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const serverDir = path.resolve('dist-server')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const server = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

for (const { page, lang, path: route } of server.ROUTE_LIST) {
  const { html, head } = server.render(route, page, lang)
  const out = template
    .replace('<html lang="es">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
  const file = path.join(dist, route, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, out)
  console.log('  ✓', route)
}

fs.writeFileSync(path.join(dist, 'index.html'), server.rootPage())
fs.writeFileSync(path.join(dist, 'sitemap.xml'), server.sitemap())
fs.writeFileSync(path.join(dist, 'robots.txt'), server.robots())
console.log('  ✓ / (language redirect), sitemap.xml, robots.txt')

fs.rmSync(serverDir, { recursive: true, force: true })

if (server.SITE_URL.includes('tu-dominio')) {
  console.warn('\n  ⚠️  SITE_URL in src/config.js is still the placeholder. Set your real domain before publishing.\n')
}
