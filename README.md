# Autocarga · EV Charging Infrastructure

Corporate website built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Adding your pictures and WhatsApp link

1. Copy your pictures into `public/images/`.
2. Open `src/config.js` and fill in the paths, for example:

```js
export const IMAGES = {
  residential: '/images/residential-garage.jpg', // Image 1
  openParking: '/images/brutalist-wall.jpg',     // Image 2
  corporate:   '/images/underground-1.jpg',      // Image 3
  complexes:   '/images/underground-2.jpg',      // Image 4
}

export const WHATSAPP_URL = 'https://wa.me/57XXXXXXXXXX'
```

Until an image path is set, a gray placeholder with the picture's description is shown.

## Languages (English / Spanish)

The site picks the language automatically from the visitor's browser:
Spanish browsers see Spanish, everything else sees English. Visitors can
switch with the **EN / ES** button in the top bar; their choice is remembered.

All texts live in `src/i18n/en.js` and `src/i18n/es.js` (same keys in both).
To change a text, edit it in both files.

## SEO

- Every page has its own URL per language: `/es/`, `/en/`, `/es/nosotros/`, `/en/about/`.
  The root `/` sends visitors to their language.
- `npm run build` generates static HTML for each page (readable without JavaScript),
  with title, description, canonical, hreflang, Open Graph and JSON-LD (local business),
  plus `sitemap.xml` and `robots.txt`.
- SEO titles/descriptions: `meta` in `src/i18n/es.js` and `src/i18n/en.js`.
- Domain, cities, social links and share image: `src/config.js`.

**Publishing:** run `npm run build` and upload the contents of the `dist/` folder.

## Structure

```
src/
  config.js                  Image paths, WhatsApp link, brand name
  App.jsx                    Page layout (Home / About Us)
  index.css                  All styles and design tokens
  components/
    Navbar.jsx               Top bar + "About Us" button
    Hero.jsx                 Main title and call to action
    Solutions.jsx            4 solutions with images
    ContactSection.jsx       Contact form (name, city, phone, email) + WhatsApp
    Benefits.jsx             3 benefits
    Connectors.jsx           Type 1, Type 2, GBT
    About.jsx                Mission, Vision, offering
    Footer.jsx
    ImageSlot.jsx            Image or placeholder
    WhatsAppButton.jsx
    Logo.jsx
```

## Note

The contact form validates the fields but does not send them anywhere yet.
Connect it to a backend or a form service (e.g. Formspree, EmailJS) in
`ContactSection.jsx` where the `TODO` comment is.

## Other commands

- `npm run build`: production build in `dist/`
- `npm run preview`: preview the production build
