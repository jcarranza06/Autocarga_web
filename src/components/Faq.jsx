import { useLang } from '../i18n/LanguageContext.jsx'

// Frequently asked questions. The same items feed the FAQPage JSON-LD in seo.js,
// so the answers here must match what Google sees in the structured data.
export default function Faq() {
  const { t } = useLang()
  const f = t.faq

  return (
    <section id="faq" className="section section--soft">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{f.eyebrow}</span>
          <h2>{f.title}</h2>
        </div>

        <div className="faq">
          {f.items.map((item, i) => (
            <details key={i} className="faq__item" open={i === 0}>
              <summary>
                <h3>{item.q}</h3>
                <span className="faq__icon" aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
