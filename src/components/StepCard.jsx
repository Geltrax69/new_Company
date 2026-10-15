// Reusable vetting/approval step card: step label, title, stat, desc, avatar row.
export default function StepCard({ step, title, stat, desc, avatars = 0, extra, tone = 'light' }) {
  return (
    <div className={`step-card step-${tone}`}>
      <span className="step-label">{step}</span>
      <h3 className="step-title">{title}</h3>
      <div className="step-stat">
        <span className="num">{stat}</span>
        <p>{desc}</p>
      </div>
      {avatars > 0 && (
        <div className="step-avatars">
          {Array.from({ length: Math.min(avatars, 7) }).map((_, i) => (
            <span key={i} className="av" style={{ '--i': i }} />
          ))}
          {extra && <span className="av-more">{extra}</span>}
        </div>
      )}
    </div>
  )
}
