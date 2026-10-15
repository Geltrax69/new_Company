import { useEffect, useState } from 'react'
import useReducedMotion from '../useReducedMotion.js'

// Cycles through words with a fade. Reusable anywhere a rotating word is needed.
// Respects prefers-reduced-motion: shows first word statically.
export default function CycleWord({ words, interval = 2600 }) {
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(true)
  const reducedMotion = useReducedMotion()
  
  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      setFade(false)
      const timeout = setTimeout(() => { setI((n) => (n + 1) % words.length); setFade(true) }, 350)
      return () => clearTimeout(timeout)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval, reducedMotion])
  
  return <span className="cycle-word" style={{ opacity: fade ? 1 : 0 }}>{words[i]}</span>
}
