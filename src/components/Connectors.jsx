import { useLang } from '../i18n/LanguageContext.jsx'

// Simplified front-view drawings of each connector (names are standards, same in every language)
const Pin = ({ x, y, r }) => <circle cx={x} cy={y} r={r} />

const connectors = [
  {
    name: (t) => `${t.connectors.type} 1`,
    detail: 'SAE J1772 · AC',
    svg: (
      <>
        <circle cx="50" cy="50" r="40" className="plug-body" />
        <Pin x={34} y={40} r={8} />
        <Pin x={66} y={40} r={8} />
        <Pin x={50} y={68} r={9} />
        <Pin x={32} y={63} r={4} />
        <Pin x={68} y={63} r={4} />
      </>
    ),
  },
  {
    name: (t) => `${t.connectors.type} 2`,
    detail: 'IEC 62196 · AC',
    svg: (
      <>
        <path d="M22 28h56a32 32 0 0 1 6 18 34 34 0 0 1-68 0 32 32 0 0 1 6-18z" className="plug-body" />
        <Pin x={40} y={40} r={4.5} />
        <Pin x={60} y={40} r={4.5} />
        <Pin x={30} y={55} r={7} />
        <Pin x={50} y={55} r={7} />
        <Pin x={70} y={55} r={7} />
        <Pin x={40} y={71} r={7} />
        <Pin x={60} y={71} r={7} />
      </>
    ),
  },
  {
    name: () => 'GBT',
    detail: 'GB/T 20234 · AC/DC',
    svg: (
      <>
        <circle cx="50" cy="50" r="40" className="plug-body" />
        <Pin x={30} y={42} r={7} />
        <Pin x={50} y={36} r={7} />
        <Pin x={70} y={42} r={7} />
        <Pin x={34} y={64} r={7} />
        <Pin x={66} y={64} r={7} />
        <Pin x={44} y={76} r={4} />
        <Pin x={56} y={76} r={4} />
      </>
    ),
  },
]

export default function Connectors() {
  const { t } = useLang()
  return (
    <section id="connectors" className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{t.connectors.eyebrow}</span>
          <h2>{t.connectors.title}</h2>
        </div>

        <div className="connectors">
          {connectors.map((c) => (
            <article key={c.detail} className="connector">
              <svg viewBox="0 0 100 100" className="connector__svg" aria-hidden="true">
                {c.svg}
              </svg>
              <h3>{c.name(t)}</h3>
              <span>{c.detail}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
