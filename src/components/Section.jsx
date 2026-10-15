// Layout wrapper: constrains width and applies an optional class/id.
export default function Section({ id, className = '', children }) {
  return <section id={id} className={className}>{children}</section>
}
