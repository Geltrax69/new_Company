import ScreenArtwork from './ScreenArtwork.jsx'

// A single aligned exhibit shared by Home and Work. No independently floating UI.
export default function ProductComposition({ className = '', preview = null }) {
  const product = preview || { src: '/work/school/desktop-1.webp', title: 'Simpedu / School management' }
  const portrait = product.src.includes('/phone-') || product.src.includes('scoreboard/desktop-3')
  return (
    <div className={`product-composition ${className}`}>
      <div className="composition-exhibit-label"><span>Designed & built by Simpedu</span><span>Selected product</span></div>
      <div className="composition-exhibit-surface">
        <picture className="composition-exhibit-art" aria-hidden="true"><source media="(max-width: 700px)" srcSet="/images/showcase/silver-loop-800.webp" /><img src="/images/showcase/silver-loop-1600.webp" alt="" width="1672" height="941" /></picture>
        <div key={product.src} className={`composition-current ${portrait ? 'is-portrait' : ''}`}><ScreenArtwork src={product.src} alt={`${product.title} — product preview`} eager /></div>
      </div>
      <div className="composition-exhibit-caption"><span>{product.title}</span><span>Real product. Real screens.</span></div>
    </div>
  )
}
