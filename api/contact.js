// Vercel Serverless Function: POST /api/contact
// Sends the contact form by email using Resend (https://resend.com).
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      API key from Resend (required)
//   CONTACT_TO_EMAIL    Where requests are delivered, comma-separated for several (required)
//   CONTACT_FROM_EMAIL  Sender, e.g. "Autocarga <formulario@tudominio.com>"
//                       (domain must be verified in Resend; defaults to Resend's test sender)

const LIMITS = { name: 100, city: 100, phone: 30, email: 200 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s-]{6,}$/

const json = (status, data) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function validate(body) {
  const data = {}
  for (const key of Object.keys(LIMITS)) {
    const value = typeof body[key] === 'string' ? body[key].trim() : ''
    if (!value || value.length > LIMITS[key]) return { error: key }
    data[key] = value
  }
  if (!EMAIL_RE.test(data.email)) return { error: 'email' }
  if (!PHONE_RE.test(data.phone)) return { error: 'phone' }
  return { data }
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { ok: false, error: 'invalid_json' })
  }

  // Anti-spam: hidden "website" field must stay empty (bots fill it in)
  if (body.website) return json(200, { ok: true })

  const { data, error } = validate(body)
  if (error) return json(400, { ok: false, error: `invalid_${error}` })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return json(500, { ok: false, error: 'not_configured' })
  }
  const from = process.env.CONTACT_FROM_EMAIL || 'Autocarga <onboarding@resend.dev>'

  const lang = body.lang === 'en' ? 'English' : 'Español'
  const page = typeof body.page === 'string' ? body.page.slice(0, 100) : ''
  const rows = [
    ['Nombre', data.name],
    ['Ciudad', data.city],
    ['Teléfono', data.phone],
    ['Correo', data.email],
    ['Idioma', lang],
    ['Página', page],
  ]

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1a2233">
    <div style="background:#0b1220;color:#c6f432;padding:20px 24px;border-radius:12px 12px 0 0;font-size:20px;font-weight:bold">
      ⚡ Nueva solicitud de contacto
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e4e8ef;border-top:0">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:12px 24px;border-bottom:1px solid #e4e8ef;color:#5d6779;width:110px">${k}</td>
        <td style="padding:12px 24px;border-bottom:1px solid #e4e8ef;font-weight:bold">${escapeHtml(v)}</td>
      </tr>`
        )
        .join('')}
    </table>
    <p style="font-size:13px;color:#5d6779;padding:0 4px">
      Responde a este correo para escribirle directamente a ${escapeHtml(data.name)}.
    </p>
  </div>`

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `Nueva solicitud: ${data.name} (${data.city})`,
        html,
        text,
      }),
    })
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text())
      return json(502, { ok: false, error: 'send_failed' })
    }
    return json(200, { ok: true })
  } catch (err) {
    console.error('Resend request failed', err)
    return json(502, { ok: false, error: 'send_failed' })
  }
}
