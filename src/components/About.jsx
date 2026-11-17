import { useLang } from '../i18n/LanguageContext.jsx'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <>
      <section className="about-hero">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container about-hero__inner">
          <span className="eyebrow eyebrow--light">{a.eyebrow}</span>
          <h1>
            {a.titleStart}
            <span className="highlight">{a.titleHighlight}</span>
            {a.titleEnd}
          </h1>
          <div className="about-hero__stat">
            <strong>15</strong>
            <span>{a.statLine1}<br />{a.statLine2}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mv">
          <article className="mv__card">
            <span className="mv__label">{a.mission}</span>
            <p>{a.missionText}</p>
          </article>
          <article className="mv__card mv__card--dark">
            <span className="mv__label">{a.vision}</span>
            <p>{a.visionText}</p>
          </article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">{a.offerEyebrow}</span>
            <h2>{a.offerTitle}</h2>
          </div>
          <div className="offering">
            {a.offering.map((o, i) => (
              <article key={i} className="offering__item">
                <span className="solution__index">0{i + 1}</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
