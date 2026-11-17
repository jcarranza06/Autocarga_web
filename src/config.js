// ─────────────────────────────────────────────────────────────
//  Site settings.
//  Pictures live in /public/images. Files in /public are served
//  from the site root, so the path starts with "/images/..."
//  (do NOT include "public" in the path).
// ─────────────────────────────────────────────────────────────

// ⚠️ SEO: your real domain, without a trailing slash.
//    Used for canonical URLs, hreflang, sitemap.xml and social previews.
export const SITE_URL = 'https://www.tu-dominio.com'

// Cities where you work (used by Google for local searches).
// Example: ['Bogotá', 'Medellín', 'Cali']. Empty = "Colombia".
export const CITIES = ['Bogotá']

// Social media profile URLs (Instagram, LinkedIn, Facebook…). Optional.
export const SOCIAL_LINKS = []

// Picture shown when the link is shared on WhatsApp, LinkedIn, Facebook…
// Ideal size: 1200 × 630 px.
export const OG_IMAGE = '/images/image3_autocarga.png'

// When you convert to WebP, change the file names here (e.g. image1_autocarga.webp)
// and update width/height if the size changes.
export const IMAGES = {
  // Image 1 – Wall-mounted charger charging an electric vehicle
  residential: { src: '/images/image1_autocarga.webp', width: 453, height: 453 },
  // Image 2 – Modern, brutalist-style wall with electric vehicles charging
  openParking: { src: '/images/image2_autocarga.webp', width: 495, height: 495 },
  // Image 3 – Well-lit underground parking garage with EVs charging
  corporate: { src: '/images/image3_autocarga.webp', width: 541, height: 541 },
  // Image 4 – Underground parking garage with additional EVs charging
  complexes: { src: '/images/image4_autocarga.webp', width: 543, height: 362 },
}

// WhatsApp link for Adri, e.g. 'https://wa.me/573001234567'
export const WHATSAPP_URL = 'https://wa.me/573204400593'
export const WHATSAPP_NAME = 'Adri'

export const BRAND = 'Autocarga'
