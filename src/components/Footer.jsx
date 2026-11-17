import { BRAND } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Logo from './Logo.jsx'
import Link from './Link.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="nav__brand nav__brand--static">
            <Logo />
            <span>{BRAND}</span>
          </div>
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer__links">
          <Link page="home" section="solutions">{t.nav.solutions}</Link>
          <Link page="home" section="benefits">{t.nav.benefits}</Link>
          <Link page="home" section="connectors">{t.nav.connectors}</Link>
          <Link page="about">{t.nav.about}</Link>
        </nav>
        <WhatsAppButton />
      </div>
      <div className="container footer__bottom">
        © {new Date().getFullYear()} {BRAND}. {t.footer.rights}
      </div>
    </footer>
  )
}
