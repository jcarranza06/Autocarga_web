import { useLang } from '../i18n/LanguageContext.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import Link from './Link.jsx'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light">{h.eyebrow}</span>
          <h1>
            {h.titleStart}
            <span className="highlight">{h.titleHighlight}</span>
          </h1>
          <p className="hero__subtitle">{h.subtitle}</p>
          <p className="hero__text">{h.text}</p>
          <div className="hero__actions">
            <Link page="home" section="contact" className="btn btn--primary">
              {h.cta}
              <span aria-hidden="true">→</span>
            </Link>
            <WhatsAppButton className="btn--ghost-light" />
          </div>
        </div>

        <div className="hero__panel" aria-hidden="true">
          <div className="charge-card">
            <div className="charge-card__top">
              <span>{h.card.session}</span>
              <span className="pulse-dot" />
            </div>
            <div className="charge-card__value">82<small>%</small></div>
            <div className="charge-card__bar"><span /></div>
            <div className="charge-card__meta">
              <div><small>{h.card.connector}</small><strong>{t.connectors.type} 2</strong></div>
              <div><small>{h.card.location}</small><strong>{h.card.indoor}</strong></div>
            </div>
          </div>
          <div className="stat-chip stat-chip--a"><strong>15</strong> {h.chipYears}</div>
          <div className="stat-chip stat-chip--b">{h.chipCertified}</div>
        </div>
      </div>
    </section>
  )
}
