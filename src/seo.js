import { SITE_URL, BRAND, OG_IMAGE, WHATSAPP_URL, CITIES, SOCIAL_LINKS } from './config.js'
import { DICTIONARIES } from './i18n/LanguageContext.jsx'
import { LANGS, pathFor } from './routes.js'

const abs = (path) => `${SITE_URL}${path}`
const OG_LOCALE = { es: 'es_CO', en: 'en_US' }
const phone = WHATSAPP_URL.match(/(\d{8,})/)?.[1]

export function getSeo(page, lang) {
  const meta = DICTIONARIES[lang].meta[page]
  return {
    title: meta.title,
    description: meta.description,
    canonical: abs(pathFor(page, lang)),
    alternates: [
      ...LANGS.map((l) => ({ hreflang: l, href: abs(pathFor(page, l)) })),
      { hreflang: 'x-default', href: abs('/') },
    ],
  }
}

// Structured data so Google understands who you are (local business)
export function jsonLd(lang) {
  const t = DICTIONARIES[lang]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: BRAND,
    url: abs(pathFor('home', lang)),
    image: abs(OG_IMAGE),
    description: t.meta.home.description,
    areaServed: CITIES.length
      ? CITIES.map((name) => ({ '@type': 'City', name }))
      : { '@type': 'Country', name: 'Colombia' },
    knowsLanguage: ['es', 'en'],
    makesOffer: t.solutions.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.text },
    })),
  }
  if (phone) {
    data.telephone = `+${phone}`
    data.contactPoint = {
      '@type': 'ContactPoint',
      telephone: `+${phone}`,
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    }
  }
  if (SOCIAL_LINKS.length) data.sameAs = SOCIAL_LINKS
  return data
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// <head> tags for a prerendered page (used at build time)
export function headTags(page, lang) {
  const seo = getSeo(page, lang)
  const other = LANGS.filter((l) => l !== lang)
  const image = abs(OG_IMAGE)
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    ...seo.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BRAND)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...other.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

// Keep the browser tab in sync when navigating without reloading
export function applySeo(page, lang) {
  const seo = getSeo(page, lang)
  document.documentElement.lang = lang
  document.title = seo.title
  const set = (tag, attrs, key, value) => {
    const selector = tag + Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('')
    let el = document.head.querySelector(selector)
    if (!el) {
      el = document.createElement(tag)
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
      document.head.appendChild(el)
    }
    el.setAttribute(key, value)
  }
  set('meta', { name: 'description' }, 'content', seo.description)
  set('link', { rel: 'canonical' }, 'href', seo.canonical)
  seo.alternates.forEach((a) => set('link', { rel: 'alternate', hreflang: a.hreflang }, 'href', a.href))
  set('meta', { property: 'og:title' }, 'content', seo.title)
  set('meta', { property: 'og:description' }, 'content', seo.description)
  set('meta', { property: 'og:url' }, 'content', seo.canonical)
}
