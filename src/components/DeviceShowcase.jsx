import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Cycles through `images` inside a CSS device frame (phone or desktop/"Mac Studio Display").
// ponytail: plain gsap crossfade timeline, no carousel library — one effect, not a product.
export default function DeviceShowcase({ images, kind = 'phone', interval = 2800 }) {
  const [active, setActive] = useState(0)
  const slideRefs = useRef([])

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.03, duration: 0.6, ease: 'power2.out' })
    })
  }, [active])

  return (
    <div className={`device device-${kind}`}>
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
      {kind === 'phone' && <div className="device-notch" />}
      {kind === 'desktop' && <div className="device-stand" />}
      <div className="device-dots">
        {images.map((_, i) => (
          <span key={i} className={i === active ? 'on' : ''} onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  )
}
