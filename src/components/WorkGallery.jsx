import { useEffect, useRef, useState } from 'react'
import ScreenArtwork from './ScreenArtwork.jsx'

const pad = value => String(value).padStart(2, '0')

export default function WorkGallery({ project, open, onClose }) {
  const dialog = useRef(null)
  const thumbs = useRef([])
  const [active, setActive] = useState(0)
  const count = project.images.length

  useEffect(() => {
    const node = dialog.current
    if (!open || !node) return
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    setActive(0)
    node.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      node.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [open])

  const select = (index) => {
    const next = (index + count) % count
    setActive(next)
    thumbs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
  }

  return (
    <dialog ref={dialog} className="work-gallery-dialog" aria-label={`${project.title} screen collection`} onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1) }
        if (event.key === 'Home') { event.preventDefault(); select(0) }
        if (event.key === 'End') { event.preventDefault(); select(count - 1) }
      }}>
      {open && <div className="screen-collection">
        <header className="collection-header">
          <div><span className="collection-caption">The screen collection</span><h2>{project.title}</h2></div>
          <button type="button" className="collection-close" onClick={onClose} aria-label="Close screen collection"><span aria-hidden="true">×</span></button>
        </header>
        <div className="collection-canvas">
          <span className="collection-counter" aria-live="polite" aria-atomic="true">{pad(active + 1)} <span>/ {pad(count)}</span></span>
          <button type="button" className="collection-prev" onClick={() => select(active - 1)} aria-label="Previous screen"><span aria-hidden="true">←</span></button>
          <div key={project.images[active]} className={`collection-art ${project.kind === 'phone' ? 'is-phone' : ''}`}>
            <ScreenArtwork src={project.images[active]} alt={`${project.title} — product screen ${active + 1} of ${count}`} eager />
          </div>
          <button type="button" className="collection-next" onClick={() => select(active + 1)} aria-label="Next screen"><span aria-hidden="true">→</span></button>
        </div>
        <div className="collection-bottom">
          <p>Take a closer look.<span>Use the arrows or choose a screen.</span></p>
          <div className="collection-filmstrip" role="group" aria-label="Choose a product screen">
            {project.images.map((src, i) => <button ref={node => { thumbs.current[i] = node }} key={src} type="button" aria-label={`Show screen ${i + 1}`} aria-pressed={active === i} onClick={() => select(i)}>
              <img src={src} alt="" loading="lazy" width="80" height="56" /><span>{pad(i + 1)}</span>
            </button>)}
          </div>
        </div>
      </div>}
    </dialog>
  )
}
