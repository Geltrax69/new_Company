import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

// Keep Three.js out of the initial page bundle and off touch/reduced-motion devices.
const Cubes = lazy(() => import('./ui/background-cubes-grid').then(module => ({ default: module.BackgroundCubesGrid })))

class CubesBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function HomeCubes() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)')
    let inView = false
    const update = () => setActive(inView && media.matches && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    if (ref.current) observer.observe(ref.current)
    media.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div ref={ref} className="home-cubes" aria-hidden="true">
      <div className="home-cubes-static" />
      {active && (
        <CubesBoundary>
          <Suspense fallback={null}>
            <Cubes
              variant="isometric"
              cellSize={132}
              topColor="#fafafa"
              leftColor="#e4e4e7"
              rightColor="#d4d4d8"
              amplitude={0.65}
              speed={7}
              damping={0.08}
              glowColor="#a1a1aa"
              glow={0.35}
              idleRipples={false}
            />
          </Suspense>
        </CubesBoundary>
      )}
    </div>
  )
}
