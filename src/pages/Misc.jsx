import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import TagPill from '../components/TagPill.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

// --- Services & solutions ---
const SERVICE_GROUPS = [
  ['Design', ['Website', 'Landing page', 'Mobile & web app', 'UX/UI audit', 'Brand identity', 'Illustration']],
  ['No-code development', ['Webflow', 'Framer', 'Airtable', 'Zapier', 'Bubble', 'Automations']],
  ['Marketing', ['Social creative', 'Banners & ads', 'SEO', 'Content', 'Email design', 'Copywriting']],
  ['Software development', ['Frontend', 'Backend', 'Full-stack', 'AI development', 'QA engineering', 'Mobile']],
]

export function Services() {
  useDocumentTitle('Services & solutions', 'Websites, school management systems, sports portals and custom software — designed, built and shipped by Simpedu LLP.')
  return (
    <>
      <PageHeader eyebrow="Services & solutions" title="What we can build for you" subtitle="From a school website to a full custom platform — scoped, built and shipped by our in-house team." />
      <Section className="service-groups">
        {SERVICE_GROUPS.map(([title, items], i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="service-group">
              <h3 className="heading-sm">{title}</h3>
              <div className="service-group-tags">
                {items.map((it) => <TagPill key={it}>{it}</TagPill>)}
              </div>
            </div>
          </Reveal>
        ))}
      </Section>
    </>
  )
}

// --- Generic form page (Book demo / Apply) ---
function FormPage({ eyebrow, title, subtitle, fields, cta, type }) {
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  useDocumentTitle(eyebrow, `${title} — ${subtitle || 'Get in touch with Simpedu LLP.'}`)

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    const data = Object.fromEntries(new FormData(e.target).entries())
    try {
      const r = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data }),
      })
      if (!r.ok) throw new Error('send failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again, or email us directly at contact@simpedu.in or support@simpedu.in.')
    }
    setSending(false)
  }

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Section className="form-page">
        <Reveal>
          {done ? (
            <div className="form-done">✓ Thanks! We've received your details and will reach out shortly.</div>
          ) : (
            <form className="stack-form" onSubmit={submit}>
              {fields.map((f) => (
                <label key={f.name} className="field">
                  <span>{f.label}</span>
                  {f.type === 'textarea'
                    ? <textarea name={f.name} required={f.required} rows={4} placeholder={f.placeholder} />
                    : <input name={f.name} type={f.type || 'text'} required={f.required} placeholder={f.placeholder} />}
                </label>
              ))}
              {error && <div className="form-error" role="alert">{error}</div>}
              <Button type="submit" disabled={sending}>{sending ? 'Sending…' : cta}</Button>
            </form>
          )}
        </Reveal>
      </Section>
    </>
  )
}

export function Book() {
  return <FormPage
    eyebrow="Book a demo" title="Let's scope your project" subtitle="Tell us what you're building — we'll come back with a plan and a quote."
    cta="Request demo" type="demo"
    fields={[
      { name: 'name', label: 'Full name', required: true, placeholder: 'Jane Doe' },
      { name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'jane@company.com' },
      { name: 'company', label: 'Company', placeholder: 'Acme Inc.' },
      { name: 'about', label: 'What do you need?', type: 'textarea', placeholder: 'A landing page, a brand refresh, ongoing design…' },
    ]} />
}

export function Apply() {
  return <FormPage
    eyebrow="Apply as a talent" title="Join the Simpedu team" subtitle="Designers, developers and testers — show us your best work."
    cta="Submit application" type="careers"
    fields={[
      { name: 'name', label: 'Full name', required: true, placeholder: 'Your name' },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
      { name: 'portfolio', label: 'Portfolio URL', type: 'url', required: true, placeholder: 'https://…' },
      { name: 'specialty', label: 'Your specialty', placeholder: 'UI/UX, Motion, Frontend…' },
    ]} />
}

export function Login() {
  const navigate = useNavigate()
  useDocumentTitle('Log in', 'Sign in to your Simpedu account.')
  return (
    <Section className="auth-page">
      <Reveal className="auth-card">
        <h1 className="heading">Welcome back</h1>
        <form className="stack-form" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}>
          <label className="field"><span>Email</span><input type="email" required placeholder="you@company.com" /></label>
          <label className="field"><span>Password</span><input type="password" required placeholder="••••••••" /></label>
          <Button type="submit">Log in</Button>
        </form>
        <p className="auth-alt">New here? <Link to="/book">Book a demo</Link></p>
      </Reveal>
    </Section>
  )
}

// --- Blog post (placeholder article) ---
export function BlogPost() {
  const { slug } = useParams()
  const title = slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
  useDocumentTitle(title, `${title} — article from the Simpedu team.`)
  return (
    <Section className="post">
      <Reveal as="article" className="post-body">
        <Link to="/blog" className="post-back">← All posts</Link>
        <h1 className="display-sm">{title}</h1>
        <p className="post-lead">A short, demo article. Real content would be loaded from a CMS here.</p>
        <div className="post-hero" />
        <p>Simpedu LLP is a software company born in education — we build school management systems, sports portals and other platforms that replace manual work. This article is placeholder copy to demonstrate the blog post route and layout.</p>
        <p>Queue tasks, get daily deliverables, and pause whenever you like. That's the whole idea.</p>
      </Reveal>
    </Section>
  )
}

// --- 404 ---
export function NotFound() {
  useDocumentTitle('Page not found', 'This page does not exist. Return to the Simpedu LLP homepage.')
  return (
    <Section className="notfound">
      <Reveal>
        <h1 className="display">404</h1>
        <p className="body-lg">This page wandered off. Let's get you back.</p>
        <Button as={Link} to="/">Back home</Button>
      </Reveal>
    </Section>
  )
}
