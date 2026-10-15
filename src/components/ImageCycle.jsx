import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Plain crossfading image stack — no device chrome, just real screenshots filling a box.
export default function ImageCycle({ images, interval = 2200, className = '' }) {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { opacity: i === active ? 1 : 0, duration: 0.7, ease: 'power2.out' })
    })
  }, [active])

  return (
    <div className={`image-cycle ${className}`}>
      {images.map((src, i) => (
        <img key={src} ref={(el) => (refs.current[i] = el)} src={src} alt="" loading="lazy" style={{ opacity: i === active ? 1 : 0 }} />
      ))}
    </div>
  )
}
