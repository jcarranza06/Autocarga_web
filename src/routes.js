// Every page has its own URL per language → Google can index both languages.
export const ROUTES = {
  home: { es: '/es/', en: '/en/' },
  about: { es: '/es/nosotros/', en: '/en/about/' },
}

export const LANGS = ['es', 'en']

export const pathFor = (page, lang) => ROUTES[page][lang]

// [{ page, lang, path }]
export const ROUTE_LIST = Object.entries(ROUTES).flatMap(([page, paths]) =>
  Object.entries(paths).map(([lang, path]) => ({ page, lang, path }))
)

const normalize = (p) => (p.endsWith('/') ? p : `${p}/`)

// '/es/nosotros' → { page: 'about', lang: 'es' }  (null if unknown)
export function parsePath(pathname) {
  const p = normalize(pathname)
  const match = ROUTE_LIST.find((r) => r.path === p)
  return match ? { page: match.page, lang: match.lang } : null
}
