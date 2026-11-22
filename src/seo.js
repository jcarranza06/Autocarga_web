import { SITE_URL, BRAND, OG_IMAGE, OG_IMAGE_SIZE, WHATSAPP_URL, CITIES, SOCIAL_LINKS, CONTACT_EMAIL } from './config.js'
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

const ALL_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const KEYWORDS = {
  es: ['instalación de cargadores eléctricos', 'cargador para vehículo eléctrico', 'electrolinera', 'certificación RETIE', 'cargador 7 kW', 'cargador 11 kW'],
  en: ['EV charger installation', 'electric vehicle charger', 'EV charging station', 'RETIE certification', '7 kW charger', '11 kW charger'],
}

// Structured data so Google understands who you are (local business)
export function jsonLd(lang) {
  const t = DICTIONARIES[lang]
  const hours = { '@type': 'OpeningHoursSpecification', dayOfWeek: ALL_WEEK, opens: '00:00', closes: '23:59' }
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': `${SITE_URL}/#business`,
    name: BRAND,
    url: abs(pathFor('home', lang)),
    logo: abs('/favicon.svg'),
    image: abs(OG_IMAGE),
    description: t.meta.home.description,
    slogan: t.hero.subtitle,
    // Service-area business: city only, no street address
    address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressRegion: 'Bogotá D.C.', addressCountry: 'CO' },
    areaServed: CITIES.length
      ? CITIES.map((name) => ({ '@type': 'City', name }))
      : { '@type': 'Country', name: 'Colombia' },
    openingHoursSpecification: hours,
    knowsLanguage: ['es', 'en'],
    knowsAbout: KEYWORDS[lang],
    makesOffer: t.solutions.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.text },
    })),
  }
  if (phone || CONTACT_EMAIL) {
    data.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'CO',
      availableLanguage: ['Spanish', 'English'],
      hoursAvailable: hours,
    }
  }
  if (phone) {
    data.telephone = `+${phone}`
    data.contactPoint.telephone = `+${phone}`
  }
  if (CONTACT_EMAIL) {
    data.email = CONTACT_EMAIL
    data.contactPoint.email = CONTACT_EMAIL
  }
  if (SOCIAL_LINKS.length) data.sameAs = SOCIAL_LINKS
  return data
}

// FAQ structured data (home page only); mirrors the visible FAQ section
export function faqJsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DICTIONARIES[lang].faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

const ldScript = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

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
    `<meta property="og:image:width" content="${OG_IMAGE_SIZE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_SIZE.height}" />`,
    `<meta property="og:image:alt" content="${esc(seo.title)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...other.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ldScript(jsonLd(lang)),
    ...(page === 'home' ? [ldScript(faqJsonLd(lang))] : []),
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
