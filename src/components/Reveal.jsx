import { useEffect, useRef, useState } from 'react'

// Wraps children and fades them in on scroll. delay in seconds.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.unobserve(node) }
    }, { threshold: 0.12 })
    io.observe(node)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ '--d': `${delay}s` }}>
      {children}
    </Tag>
  )
}
