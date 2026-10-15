import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const SHELL = { phone: '/frames/iphone-shell.webp', desktop: '/frames/studio-display-shell.webp' }

// Cycles through `images` inside a real Apple device shell (PNG with a transparent screen
// cutout, sourced from Figma — see DeviceShowcase CSS comment for the source files).
// ponytail: plain gsap crossfade timeline, no carousel library — one effect, not a product.
export default function DeviceShowcase({ images, kind = 'phone', interval = 2800, glow }) {
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const slideRefs = useRef([])
  const tiltRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval, reducedMotion])

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.03, duration: 0.6, ease: 'power2.out' })
    })
  }, [active])

  // ponytail: plain mousemove tilt, no 3D lib — a few degrees of rotation sells the effect.
  const onMove = (e) => {
    const el = tiltRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, { rotateY: px * 14, rotateX: py * -14, duration: 0.4, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(tiltRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <div className="device-stage" style={glow ? { '--glow': glow } : undefined}>
      <div className="device-glow" />
      <div
        ref={tiltRef}
        className={`device device-${kind}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="device-screen">
          {images.map((src, i) => (
            <img
              key={src}
              ref={(el) => (slideRefs.current[i] = el)}
              src={src}
              alt=""
              loading="lazy"
              className="device-slide"
              style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
            />
          ))}
        </div>
        <img src={SHELL[kind]} alt="" className="device-shell" />
      </div>
      <div className="device-dots">
        {images.map((_, i) => (
          <span key={i} className={i === active ? 'on' : ''} onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  )
}
