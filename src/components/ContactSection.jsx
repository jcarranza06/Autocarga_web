import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

const empty = { name: '', city: '', phone: '', email: '', website: '' }

const fields = [
  { name: 'name', type: 'text', autoComplete: 'name', maxLength: 100 },
  { name: 'city', type: 'text', autoComplete: 'address-level2', maxLength: 100 },
  { name: 'phone', type: 'tel', autoComplete: 'tel', maxLength: 30 },
  { name: 'email', type: 'email', autoComplete: 'email', maxLength: 200 },
]

// Returns the keys of invalid fields (messages come from the dictionary)
function validate(form) {
  const invalid = []
  if (!form.name.trim()) invalid.push('name')
  if (!form.city.trim()) invalid.push('city')
  if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) invalid.push('phone')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) invalid.push('email')
  return invalid
}

export default function ContactSection({ id, eyebrow, title }) {
  const { t, lang, page } = useLang()
  const c = t.contact
  const [form, setForm] = useState(empty)
  const [invalid, setInvalid] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const result = validate(form)
    setInvalid(result)
    if (result.length) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang, page: window.location.pathname || page }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || res.status)
      setStatus('sent')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <section id={id} className="section contact">
      <div className="container contact__inner">
        <div className="contact__intro">
          <span className="eyebrow eyebrow--light">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{c.intro}</p>
          <div className="contact__direct">
            <span>{c.direct}</span>
            <WhatsAppButton />
          </div>
        </div>

        <div className="contact__card">
          {status === 'sent' ? (
            <div className="contact__success" role="status">
              <div className="contact__check">✓</div>
              <h3>{c.successTitle}</h3>
              <p>{c.successText}</p>
              <button className="btn btn--outline-dark" onClick={() => setStatus('idle')}>
                {c.again}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3>{c.formTitle}</h3>
              <div className="form-grid">
                {fields.map((f) => {
                  const hasError = invalid.includes(f.name)
                  return (
                    <label key={f.name} className={`field ${hasError ? 'has-error' : ''}`}>
                      <span>{c.fields[f.name]}</span>
                      <input
                        name={f.name}
                        type={f.type}
                        value={form[f.name]}
                        onChange={update}
                        autoComplete={f.autoComplete}
                        maxLength={f.maxLength}
                        disabled={sending}
                        aria-invalid={hasError}
                      />
                      {hasError && <small>{c.errors[f.name]}</small>}
                    </label>
                  )
                })}
              </div>

              {/* Anti-spam trap: hidden from people, bots fill it in */}
              <div className="hp" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                </label>
              </div>

              {status === 'error' && (
                <p className="form-error" role="alert">{c.sendError}</p>
              )}

              <button type="submit" className="btn btn--primary btn--block" disabled={sending} aria-busy={sending}>
                {sending ? <><span className="spinner" aria-hidden="true" />{c.sending}</> : c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
