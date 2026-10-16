const SUBJECTS = { demo: 'New demo request', careers: 'New careers application', lead: 'New project enquiry' }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LABELS = { name: 'Name', email: 'Reply email', company: 'Company', about: 'Project', portfolio: 'Portfolio', specialty: 'Specialty' }
const escape = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
const json = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

// Shared by Vercel and the local Vite server. Credentials never enter client code.
export function createEmailHandler(env, send = fetch) {
  return async function handleEmail(req, res) {
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Use POST to submit an enquiry.' }) }
    let body = req.body
    if (typeof body === 'string') { try { body = JSON.parse(body) } catch { return json(res, 400, { error: 'Invalid request.' }) } }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json(res, 400, { error: 'Invalid request.' })
    const type = body.type || 'lead'
    if (!Object.hasOwn(SUBJECTS, type)) return json(res, 400, { error: 'Choose a valid enquiry type.' })
    const fields = Object.fromEntries(Object.keys(LABELS).map(key => [key, typeof body[key] === 'string' ? body[key].trim() : '']))
    if (!EMAIL.test(fields.email) || fields.email.length > 254) return json(res, 400, { error: 'Enter a valid email address.' })
    if (type !== 'lead' && !fields.name) return json(res, 400, { error: 'Enter your name.' })
    if (Object.values(fields).some(value => value.length > 4000)) return json(res, 400, { error: 'Please keep each field under 4,000 characters.' })
    if (type === 'careers') {
      try { if (!['https:', 'http:'].includes(new URL(fields.portfolio).protocol)) throw new Error() }
      catch { return json(res, 400, { error: 'Enter a valid portfolio URL.' }) }
    }
    const apiKey = env.RESEND_API_KEY?.trim()
    const from = env.EMAIL_SEND?.trim()
    const to = (env.EMAIL_SEND_MULTIPLE || '').split(',').map(value => value.trim()).filter(Boolean)
    if (!apiKey || !EMAIL.test(from || '') || !to.length || to.some(value => !EMAIL.test(value))) {
      return json(res, 503, { error: 'Email delivery is temporarily unavailable. Please email contact@simpedu.in.' })
    }
    const subject = `Simpedu · ${SUBJECTS[type]}`
    const rows = Object.entries(fields).filter(([, value]) => value).map(([key, value]) => `<tr><th align="left" style="padding:10px 20px 10px 0;vertical-align:top">${LABELS[key]}</th><td style="padding:10px 0;white-space:pre-wrap">${escape(value)}</td></tr>`).join('')
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({ from: `Simpedu <${from}>`, to, reply_to: fields.email, subject, html: `<h2>${subject}</h2><table>${rows}</table>`, text: `${subject}\n\n${Object.entries(fields).filter(([, value]) => value).map(([key, value]) => `${LABELS[key]}: ${value}`).join('\n\n')}` }),
      })
      if (!response.ok) { console.error('Email provider rejected request:', response.status); return json(res, 502, { error: 'We couldn’t send your request. Please retry or email contact@simpedu.in.' }) }
      const result = await response.json()
      if (!result.id) throw new Error('Missing delivery reference')
      return json(res, 200, { ok: true, id: result.id })
    } catch {
      return json(res, 502, { error: 'Email delivery could not be confirmed. Please retry or email contact@simpedu.in.' })
    }
  }
}
