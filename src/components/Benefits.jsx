import { BRAND } from '../config.js'
import { useLang, fill } from '../i18n/LanguageContext.jsx'

// Icons in the same order as the dictionary items
const icons = [
  <path key="clock" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  <path key="money" d="M12 3v18M16.5 7.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3 2 2.6 4.5 3 4.5 1.3 4.5 3-2 3-4.5 3-4.5-1.3-4.5-3" />,
  <path key="shield" d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3zm-3 9 2 2 4-4" />,
]

export default function Benefits() {
  const { t } = useLang()
  const b = t.benefits

  return (
    <section id="benefits" className="section section--soft">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{fill(b.eyebrow, { brand: BRAND })}</span>
          <h2>{fill(b.title, { brand: BRAND })}</h2>
        </div>

        <div className="benefits">
          {b.items.map((item, i) => (
            <article key={i} className="benefit">
              <div className="benefit__top">
                <span className="benefit__icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[i]}
                  </svg>
                </span>
                <span className="benefit__num">{i + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
