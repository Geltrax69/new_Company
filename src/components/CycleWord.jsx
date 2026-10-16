import { useEffect, useState } from 'react'
import useReducedMotion from '../useReducedMotion.js'

// Cycles through words with a fade. Reusable anywhere a rotating word is needed.
// Respects prefers-reduced-motion: shows first word statically.
export default function CycleWord({ words, interval = 2600 }) {
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(true)
  const reducedMotion = useReducedMotion()
  
  useEffect(() => {
    if (reducedMotion) {
      setI(0)
      setFade(true)
      return
    }
    let timeout
    const id = setInterval(() => {
      setFade(false)
      timeout = setTimeout(() => { setI((n) => (n + 1) % words.length); setFade(true) }, 350)
    }, interval)
    return () => {
      clearInterval(id)
      clearTimeout(timeout)
    }
  }, [words.length, interval, reducedMotion])
  
  return <span className="cycle-word" style={{ opacity: fade ? 1 : 0 }}>{words[i]}</span>
}
