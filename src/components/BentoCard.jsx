// Reusable bento-grid cell. Pass a span class and arbitrary children.
export default function BentoCard({ span = '', tone = 'mist', children }) {
  return <div className={`bento-card bento-${tone} ${span}`}>{children}</div>
}
