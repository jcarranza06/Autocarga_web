import { IMAGES } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import ImageSlot from './ImageSlot.jsx'

// Order matches the items in the dictionaries
const images = [IMAGES.residential, IMAGES.openParking, IMAGES.corporate, IMAGES.complexes]

export default function Solutions() {
  const { t } = useLang()
  const s = t.solutions

  return (
    <section id="solutions" className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2>{s.title}</h2>
        </div>

        <div className="solutions">
          {s.items.map((item, i) => (
            <article key={i} className={`solution ${i % 2 ? 'solution--reverse' : ''}`}>
              <div className="solution__media">
                <ImageSlot image={images[i]} alt={item.alt} label={`${s.imageLabel} ${i + 1} — ${item.alt}`} />
              </div>
              <div className="solution__body">
                <span className="solution__index">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
