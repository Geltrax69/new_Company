import TagPill from './TagPill.jsx'

// Reusable large service card for the horizontal services row.
// bg = card background, preview = element shown in the upper area, tags = string[]
export default function ServiceCard({ title, bg, tagTone = 'light', preview, tags = [] }) {
  return (
    <div className="service-card" style={{ '--bg': bg }}>
      <div className="service-preview">{preview}</div>
      <h2 className="service-title">{title}</h2>
      <div className="service-tags">
        {tags.map((t) => <TagPill key={t} tone={tagTone}>{t}</TagPill>)}
      </div>
    </div>
  )
}
