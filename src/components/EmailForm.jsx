import { useId, useState } from 'react'
import Button from './Button.jsx'
import { submitInquiry } from '../lib/submitInquiry.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Reusable email capture row — posts to /api/send-email (Resend), which only runs once deployed
// (or under `vercel dev` locally).
export default function EmailForm({ cta = 'Get started', type = 'lead' }) {
  const errorId = useId()
  const hasError = state => state === 'error' || state === 'sendError'
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | error | sendError | done
  const [errorMsg, setErrorMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) { setState('error'); setErrorMsg('Enter a valid email'); return }
    setState('sending')
    try {
      await submitInquiry({ type, email })
      setState('done')
    } catch (error) {
      setState('sendError')
      setErrorMsg(error.message)
    }
  }

  if (state === 'done') {
    return <div className="email-done" role="status">✓ Thanks — we'll be in touch at <b>{email}</b>.</div>
  }

  return (
    <form className={`email-row ${hasError(state) ? 'has-error' : ''}`} onSubmit={submit} noValidate>
      <input
        type="email"
        placeholder="Enter your work email"
        aria-label="Work email"
        aria-invalid={hasError(state)}
        aria-describedby={hasError(state) ? errorId : undefined}
        autoComplete="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (hasError(state)) setState('idle') }}
      />
      <Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : cta}</Button>
      {(state === 'error' || state === 'sendError') && <span id={errorId} role="alert" className="email-err">{errorMsg}</span>}
    </form>
  )
}
