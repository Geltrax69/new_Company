import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Drifts the ref'd row right-to-left as the section scrolls through the viewport.
// distance: px the row shifts left by the time the section has fully scrolled past.
// ponytail: scrub-tied transform, not a pinned scrollytelling rig — plenty for a "cards drift" effect.
export default function useScrollDrift(distance = 120) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: distance },
        {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [distance])

  return ref
}
