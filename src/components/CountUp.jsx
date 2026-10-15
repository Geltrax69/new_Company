import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Animates 0 -> `to` once the number scrolls into view. prefix/suffix stay static text.
export default function CountUp({ to, prefix = '', suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.unobserve(node) }
    }, { threshold: 0.4 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!shown) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return }
    const obj = { n: 0 }
    gsap.to(obj, { n: to, duration, ease: 'power2.out', onUpdate: () => setVal(Math.round(obj.n)) })
  }, [shown, to, duration])

  return <span ref={ref}>{prefix}{val}{suffix}</span>
}
