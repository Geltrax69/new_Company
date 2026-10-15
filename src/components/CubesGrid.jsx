import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Isometric cube-grid background (Aceternity-style), pure CSS gradients — no
// Tailwind/motion/lucide dependency. ponytail: one background pattern, gsap drifts it.
export default function CubesGrid({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.to(el, { backgroundPositionY: '+=112px', duration: 16, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [])

  return <div ref={ref} className={`cubes-grid ${className}`} aria-hidden="true" />
}
