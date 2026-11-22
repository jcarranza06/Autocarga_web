// Used only at build time to generate static HTML for every page (SEO).
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { headTags } from './seo.js'
import { ROUTE_LIST, LANGS, pathFor } from './routes.js'
import { DICTIONARIES } from './i18n/LanguageContext.jsx'
import { SITE_URL, BRAND } from './config.js'

export { ROUTE_LIST, SITE_URL }

export function render(path, page, lang) {
  return {
    html: renderToString(<App initialPath={path} />),
    head: headTags(page, lang),
  }
}

// "/" → redirects visitors to /es/ or /en/; tells Google both versions exist
export function rootPage() {
  const links = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${pathFor('home', l)}" />`).join('\n    ')
  const choices = LANGS.map((l) => `<a href="${pathFor('home', l)}">${DICTIONARIES[l].rootChoose}</a>`).join(' · ')
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${DICTIONARIES.es.meta.home.title}</title>
    <meta name="description" content="${DICTIONARIES.es.meta.home.description}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="${SITE_URL}/" />
    ${links}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
    <script>
      (function () {
        var langs = ${JSON.stringify(LANGS)}, home = ${JSON.stringify(Object.fromEntries(LANGS.map((l) => [l, pathFor('home', l)])))}, lang = 'en';
        try { var s = localStorage.getItem('autocarga-lang'); if (langs.indexOf(s) > -1) lang = s; else throw 0; }
        catch (e) {
          var prefs = navigator.languages || [navigator.language || 'en'];
          for (var i = 0; i < prefs.length; i++) { var c = String(prefs[i]).slice(0, 2).toLowerCase(); if (langs.indexOf(c) > -1) { lang = c; break; } }
        }
        location.replace(home[lang] + location.hash);
      })();
    </script>
  </head>
  <body style="font-family:system-ui,sans-serif;background:#0b1220;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0">
    <p>${BRAND} — ${choices}</p>
  </body>
</html>
`
}

export function sitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const pages = [...new Set(ROUTE_LIST.map((r) => r.page))]
  const urls = pages.flatMap((page) =>
    LANGS.map((lang) => {
      const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${pathFor(page, l)}"/>`).join('\n')
      return `  <url>
    <loc>${SITE_URL}${pathFor(page, lang)}</loc>
${alts}
    <lastmod>${today}</lastmod>
    <priority>${page === 'home' ? '1.0' : '0.7'}</priority>
  </url>`
    })
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

export function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
}
