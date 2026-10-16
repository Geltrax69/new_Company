import { WORK_MEDIA } from '../data/workMedia.js'

// Crop embedded capture chrome in a code-native window. Never stretch product UI.
export default function ScreenArtwork({ src, alt, className = '', eager = false }) {
  const { width, height, top, bottom } = WORK_MEDIA[src] || { width: 1600, height: 900, top: 0, bottom: 0 }
  const visible = 1 - top - bottom
  return (
    <div className={`screen-artwork ${className}`} style={{ aspectRatio: `${width} / ${height * visible}`, '--screen-ratio': width / (height * visible) }}>
      <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ top: `${-top / visible * 100}%` }} />
    </div>
  )
}
