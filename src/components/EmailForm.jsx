import { useState } from 'react'
import Button from './Button.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Reusable email capture row with client-side validation + success state.
// ponytail: no backend — submit just validates and confirms. Wire to an API when one exists.
export default function EmailForm({ cta = 'Get started' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | error | done

  function submit(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) { setState('error'); return }
    setState('done')
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
      <Button type="submit">{cta}</Button>
      {state === 'error' && <span className="email-err">Enter a valid email</span>}
    </form>
  )
}
