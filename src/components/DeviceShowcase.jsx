import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../useReducedMotion.js'

// Manual selection gives visitors time to read each real product screen.
export default function DeviceShowcase({ images = [], kind = 'phone', glow, label = 'Product' }) {
  const [active, setActive] = useState(0)
  const deviceRef = useRef(null)
  const buttonRefs = useRef([])
  const tilt = useRef(null)
  const reduced = useReducedMotion()
  const current = Math.min(active, Math.max(0, images.length - 1))

  useEffect(() => {
    const el = deviceRef.current
    if (!el) return
    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      tilt.current = {
        x: gsap.quickTo(el, 'rotateX', { duration: 0.25, ease: 'power2.out' }),
        y: gsap.quickTo(el, 'rotateY', { duration: 0.25, ease: 'power2.out' }),
      }
      return () => { tilt.current = null }
    })
    return () => media.revert()
  }, [])

  const onMove = (event) => {
    if (!tilt.current || reduced) return
    const rect = deviceRef.current.getBoundingClientRect()
    tilt.current.x(-((event.clientY - rect.top) / rect.height - 0.5) * 6)
    tilt.current.y(((event.clientX - rect.left) / rect.width - 0.5) * 6)
  }
  const onLeave = () => {
    tilt.current?.x(0)
    tilt.current?.y(0)
  }
  const onKeyDown = (event) => {
    let next
    if (event.key === 'ArrowRight') next = (current + 1) % images.length
    if (event.key === 'ArrowLeft') next = (current - 1 + images.length) % images.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = images.length - 1
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    buttonRefs.current[next]?.focus()
  }

  if (!images.length) return null

  return (
    <div className="device-stage" role="region" aria-label={`${label} screenshots`} style={glow ? { '--glow': glow } : undefined}>
      <div className="device-glow" aria-hidden="true" />
      <div ref={deviceRef} className={`device device-${kind}`} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="device-screen">
          <img
            key={images[current]}
            src={images[current]}
            alt={`${label}, screen ${current + 1} of ${images.length}`}
            loading="lazy"
            decoding="async"
            className="device-slide"
          />
        </div>
        {kind === 'phone' && <img src="/frames/iphone-shell.webp" alt="" className="device-shell" width="1736" height="3528" loading="lazy" />}
      </div>
      <div className="device-controls">
        <div className="device-dots" role="group" aria-label={`Choose a ${label} screen`} onKeyDown={onKeyDown}>
          {images.map((src, i) => (
            <button
              key={src}
              ref={(node) => { buttonRefs.current[i] = node }}
              type="button"
              className={i === current ? 'on' : ''}
              aria-label={`Show ${label} screen ${i + 1}`}
              aria-pressed={i === current}
              onClick={() => setActive(i)}
            ><span aria-hidden="true" /></button>
          ))}
        </div>
        <p className="device-status" aria-live="polite" aria-atomic="true">Screen {current + 1} of {images.length}</p>
      </div>
    </div>
  )
}
