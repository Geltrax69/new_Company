// Reusable portfolio tile. Pass bg color or accent.
export default function Tile({ title, tag, bg, accent = false }) {
  return (
    <div className={`tile ${accent ? 'tile-accent' : ''}`} style={!accent ? { '--bg': bg } : undefined}>
      {title}
      <small>{tag}</small>
    </div>
  )
}
