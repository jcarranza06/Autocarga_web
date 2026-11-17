import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'
import ContactSection from './components/ContactSection.jsx'
import Benefits from './components/Benefits.jsx'
import Connectors from './components/Connectors.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import { LanguageProvider, DICTIONARIES } from './i18n/LanguageContext.jsx'
import { saveLanguage } from './i18n/detect.js'
import { parsePath, pathFor } from './routes.js'
import { applySeo } from './seo.js'

const FALLBACK = { page: 'home', lang: 'es' }

export default function App({ initialPath }) {
  const [route, setRoute] = useState(() => parsePath(initialPath) ?? FALLBACK)
  const [pendingScroll, setPendingScroll] = useState(null)
  const { page, lang } = route

  // Change URL (and language) without reloading the page
  const navigate = (target, sectionId = null, targetLang = lang) => {
    if (targetLang !== lang) saveLanguage(targetLang)
    const url = pathFor(target, targetLang) + (sectionId ? `#${sectionId}` : '')
    if (url !== window.location.pathname + window.location.hash) {
      window.history.pushState(null, '', url)
    }
    setRoute({ page: target, lang: targetLang })
    // Changing language keeps the scroll position; other navigation scrolls
    setPendingScroll(sectionId ?? (targetLang !== lang && target === page ? null : 'top'))
  }

  // Browser back/forward buttons
  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname) ?? FALLBACK)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Scroll to #section when the page is opened with a hash
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  useEffect(() => applySeo(page, lang), [page, lang])

  useEffect(() => {
    if (!pendingScroll) return
    if (pendingScroll === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(pendingScroll)?.scrollIntoView({ behavior: 'smooth' })
    setPendingScroll(null)
  }, [route, pendingScroll])

  const t = DICTIONARIES[lang]

  return (
    <LanguageProvider lang={lang} page={page} navigate={navigate}>
      <Navbar />
      <main>
        {page === 'home' ? (
          <>
            <Hero />
            <Solutions />
            <ContactSection id="contact" eyebrow={t.contact.homeEyebrow} title={t.contact.homeTitle} />
            <Benefits />
            <Connectors />
          </>
        ) : (
          <>
            <About />
            <ContactSection id="contact" eyebrow={t.contact.aboutEyebrow} title={t.contact.aboutTitle} />
            <Benefits />
            <Connectors />
          </>
        )}
      </main>
      <Footer />
    </LanguageProvider>
  )
}
