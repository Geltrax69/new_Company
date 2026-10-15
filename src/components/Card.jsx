// Reusable feature card.
export default function Card({ icon, title, children }) {
  return (
    <article className="card">
      {icon && <div className="card-icon">{icon}</div>}
      <h3 className="heading-sm">{title}</h3>
      <p className="body">{children}</p>
    </article>
  )
}
