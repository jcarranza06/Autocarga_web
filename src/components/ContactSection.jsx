import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

const empty = { name: '', city: '', phone: '', email: '' }

const fields = [
  { name: 'name', type: 'text', autoComplete: 'name' },
  { name: 'city', type: 'text', autoComplete: 'address-level2' },
  { name: 'phone', type: 'tel', autoComplete: 'tel' },
  { name: 'email', type: 'email', autoComplete: 'email' },
]

// Returns the keys of invalid fields (messages come from the dictionary)
function validate(form) {
  const invalid = []
  if (!form.name.trim()) invalid.push('name')
  if (!form.city.trim()) invalid.push('city')
  if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) invalid.push('phone')
  if (!/^\S+@\S+\.\S+$/.test(form.email)) invalid.push('email')
  return invalid
}

export default function ContactSection({ id, eyebrow, title }) {
  const { t } = useLang()
  const c = t.contact
  const [form, setForm] = useState(empty)
  const [invalid, setInvalid] = useState([])
  const [sent, setSent] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const result = validate(form)
    setInvalid(result)
    if (result.length === 0) {
      // TODO: send `form` to your backend or email service here
      setSent(true)
      setForm(empty)
    }
  }

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
          {sent ? (
            <div className="contact__success">
              <div className="contact__check">✓</div>
              <h3>{c.successTitle}</h3>
              <p>{c.successText}</p>
              <button className="btn btn--outline-dark" onClick={() => setSent(false)}>
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
                        aria-invalid={hasError}
                      />
                      {hasError && <small>{c.errors[f.name]}</small>}
                    </label>
                  )
                })}
              </div>
              <button type="submit" className="btn btn--primary btn--block">
                {c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
