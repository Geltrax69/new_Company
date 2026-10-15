import { useState } from 'react'
import Button from './Button.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Reusable email capture row — posts to /api/send-email (Resend), which only runs once deployed
// (or under `vercel dev` locally).
export default function EmailForm({ cta = 'Get started', type = 'lead' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | error | sendError | done
  const [errorMsg, setErrorMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) { setState('error'); setErrorMsg('Enter a valid email'); return }
    setState('sending')
    try {
      const r = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, email }),
      })
      if (!r.ok) throw new Error('send failed')
      setState('done')
    } catch {
      setState('sendError')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (state === 'done') {
    return <div className="email-done" role="status">✓ Thanks — we'll be in touch at <b>{email}</b>.</div>
  }

  return (
    <form className={`email-row ${state === 'error' ? 'has-error' : ''}`} onSubmit={submit} noValidate>
      <input
        type="email"
        placeholder="Enter your work email"
        aria-label="Work email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
      />
      <Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : cta}</Button>
      {(state === 'error' || state === 'sendError') && <span className="email-err">{errorMsg}</span>}
    </form>
  )
}
