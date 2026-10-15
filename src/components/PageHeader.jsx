import Reveal from './Reveal.jsx'

// Reusable page hero: eyebrow + title + subtitle, centered.
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <Reveal as="header" className="page-header">
      {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
      <h1 className="display-sm">{title}</h1>
      {subtitle && <p className="body-lg">{subtitle}</p>}
    </Reveal>
  )
}
