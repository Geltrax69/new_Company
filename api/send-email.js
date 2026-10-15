// Vercel serverless function — sends lead-capture notifications via Resend.
// Runs server-side only: RESEND_API_KEY never reaches the browser bundle.
const LABELS = {
  demo: 'New Book Demo request',
  careers: 'New Careers application',
  lead: 'New lead capture',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { type = 'lead', ...fields } = req.body || {}
  if (!fields.email) return res.status(400).json({ error: 'Email is required' })

  const subject = LABELS[type] || LABELS.lead
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#71717a;text-transform:capitalize">${k}</td><td>${String(v).replace(/</g, '&lt;')}</td></tr>`)
    .join('')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Simpedu <${process.env.EMAIL_SEND}>`,
        to: process.env.EMAIL_SEND_MULTIPLE.split(',').map((s) => s.trim()),
        reply_to: fields.email,
        subject,
        html: `<h2>${subject}</h2><table>${rows}</table>`,
      }),
    })
    if (!r.ok) throw new Error(await r.text())
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend send failed:', err.message)
    return res.status(502).json({ error: 'Email send failed' })
  }
}
