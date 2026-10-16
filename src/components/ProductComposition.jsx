import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScreenArtwork from './ScreenArtwork.jsx'

gsap.registerPlugin(ScrollTrigger)

// One visual language for the homepage and portfolio; all UI remains authentic.
export default function ProductComposition({ className = '', preview = null }) {
  const root = useRef(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const layers = gsap.utils.toArray('[data-depth]')
        layers.forEach(layer => {
          const depth = Number(layer.dataset.depth)
          gsap.fromTo(layer, { y: depth }, { y: -depth, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: .25, invalidateOnRefresh: true } })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [])
  return (
    <div ref={root} className={`product-composition ${preview ? 'is-previewing' : ''} ${className}`}>
      <picture className="composition-sculpture" aria-hidden="true" data-depth="16">
        <source media="(max-width: 700px)" srcSet="/images/showcase/silver-loop-800.webp" />
        <img src="/images/showcase/silver-loop-1600.webp" alt="" width="1672" height="941" fetchPriority="high" />
      </picture>
      <div className="composition-wide" data-depth="36"><ScreenArtwork src="/work/school/desktop-1.webp" alt="Simpedu school management dashboard" eager /><span>01 — Simpedu / Education</span></div>
      <div className="composition-phone" data-depth="65"><ScreenArtwork src="/work/uniminute/phone-5.webp" alt="Uniminute mobile shopping experience" eager /></div>
      <div className="composition-detail" data-depth="22"><ScreenArtwork src="/work/scoreboard/desktop-1.webp" alt="ScoreBoard live match display" eager /></div>
      {preview && <div key={preview.src} className={`composition-project-preview ${preview.src.includes('/phone-') ? 'preview-portrait' : ''}`}><ScreenArtwork src={preview.src} alt={`${preview.title} — project preview`} eager /><span>{preview.title}</span></div>}
      <span className="composition-note">Designed here. Used out there.</span>
    </div>
  )
}
