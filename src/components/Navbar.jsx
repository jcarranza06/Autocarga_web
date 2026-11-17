import { useEffect, useState } from 'react'
import { BRAND } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Logo from './Logo.jsx'
import Link from './Link.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'

const sections = ['solutions', 'benefits', 'connectors', 'contact']

export default function Navbar() {
  const { t, page } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Link page="home" className="nav__brand" onNavigate={close} aria-label={`${BRAND} ${t.nav.home}`}>
          <Logo />
          <span>{BRAND}</span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {sections.map((id) => (
            <Link
              key={id}
              page={page === 'about' && id === 'solutions' ? 'home' : page}
              section={id}
              onNavigate={close}
            >
              {t.nav[id]}
            </Link>
          ))}
          <Link
            page="about"
            className={`btn btn--outline nav__about ${page === 'about' ? 'is-active' : ''}`}
            aria-current={page === 'about' ? 'page' : undefined}
            onNavigate={close}
          >
            {t.nav.about}
          </Link>
        </nav>

        <div className="nav__right">
          <LanguageSwitch onNavigate={close} />
          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-label={t.nav.toggleMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
