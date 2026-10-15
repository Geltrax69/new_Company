// Reusable accordion row built on native <details>.
export default function FaqItem({ q, children }) {
  return (
    <details>
      <summary>{q}<i>+</i></summary>
      <p>{children}</p>
    </details>
  )
}
