import { useEffect, useState } from 'react'
import { BRAND } from '../config.js'
import { useLang } from '../i18n/LanguageContext.jsx'

// Decorative wall charger that "charges" a car from START to 100 %.
const START = 20
const BATTERY_KWH = 60
const POWER_KW = 22
const DURATION_MS = 7000

const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)

function formatTime(min, ready) {
  if (min <= 0) return ready
  const h = Math.floor(min / 60)
  const m = Math.round(min % 60)
  return h ? `${h}h ${m}m` : `${m} min`
}

export default function ChargerGraphic() {
  const { t } = useLang()
  const c = t.hero.card
  const [pct, setPct] = useState(START)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPct(100)
      return
    }
    let frame
    let start
    const tick = (now) => {
      start ??= now
      const p = Math.min(1, (now - start) / DURATION_MS)
      setPct(START + (100 - START) * ease(p))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    const delay = setTimeout(() => (frame = requestAnimationFrame(tick)), 500)
    return () => { clearTimeout(delay); cancelAnimationFrame(frame) }
  }, [])

  const value = Math.round(pct)
  const done = value >= 100
  const energy = (((pct - START) / 100) * BATTERY_KWH).toFixed(1)
  const minutesLeft = (((100 - pct) / 100) * BATTERY_KWH / POWER_KW) * 60

  return (
    <div className={`charger ${done ? 'is-done' : ''}`}>
      <div className="charger__body">
        <div className="charger__top">
          <span className="charger__brand">
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" /></svg>
            {BRAND}
          </span>
          <span className="charger__led" />
        </div>

        <div className="charger__screen">
          <div className="charger__status">
            {done ? `✓ ${c.complete}` : c.charging}
          </div>
          <div className="charger__pct">{value}<small>%</small></div>
          <div className="battery">
            <div className="battery__fill" style={{ width: `${pct}%` }} />
            <div className="battery__cells">{Array.from({ length: 5 }, (_, i) => <span key={i} />)}</div>
          </div>
          <div className="charger__stats">
            <div><small>{c.power}</small><strong>{POWER_KW} kW</strong></div>
            <div><small>{c.energy}</small><strong>{energy} kWh</strong></div>
            <div><small>{c.remaining}</small><strong>{formatTime(minutesLeft, c.ready)}</strong></div>
          </div>
        </div>

        {/* Socket with the plug inserted */}
        <div className="charger__socket">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="18" className="socket-ring" />
            <circle cx="14" cy="15" r="2.6" /><circle cx="26" cy="15" r="2.6" />
            <circle cx="11" cy="23" r="2.6" /><circle cx="20" cy="23" r="2.6" /><circle cx="29" cy="23" r="2.6" />
            <circle cx="15.5" cy="30" r="2.6" /><circle cx="24.5" cy="30" r="2.6" />
          </svg>
        </div>
      </div>

      {/* Cable going to the car */}
      <svg className="charger__cable" viewBox="0 0 240 130" preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="cableFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="cableMask"><rect width="240" height="130" fill="url(#cableFade)" /></mask>
        </defs>
        <rect x="108" y="0" width="24" height="16" rx="5" className="cable-collar" />
        <g mask="url(#cableMask)">
          <path d="M120 16 C120 70, 40 50, 30 130" className="cable" />
          <path d="M120 16 C120 70, 40 50, 30 130" className="cable-energy" />
        </g>
      </svg>
    </div>
  )
}
