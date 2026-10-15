// Reusable skill/service tag pill. tone: "light" | "dark"
export default function TagPill({ tone = 'light', children }) {
  return <span className={`tagpill tagpill-${tone}`}>{children}</span>
}
