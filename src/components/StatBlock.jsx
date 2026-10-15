// Reusable metric block.
export default function StatBlock({ num, label }) {
  return (
    <div className="stat">
      <span className="num">{num}</span>
      <span className="lbl">{label}</span>
    </div>
  )
}
