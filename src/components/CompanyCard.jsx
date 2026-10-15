// Reusable "client project" card: icon, name, one-line desc, optional status + live link.
export default function CompanyCard({ name, desc, status, link, color }) {
  return (
    <div className="company-card">
      <div className="company-head">
        <span className="company-icon" style={{ background: color }}>{name[0]}</span>
        <strong>{name}</strong>
      </div>
      <p className="company-desc">{desc}</p>
      {status && <p className="company-status">{status}</p>}
      {link && (
        <a className="company-link" href={link} target="_blank" rel="noreferrer">
          {link} <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}
