import { useEffect, useState } from 'react'

// Cycles through words with a fade. Reusable anywhere a rotating word is needed.
export default function CycleWord({ words, interval = 2600 }) {
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const id = setInterval(() => {
      setFade(false)
      setTimeout(() => { setI((n) => (n + 1) % words.length); setFade(true) }, 350)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return <span className="cycle-word" style={{ opacity: fade ? 1 : 0 }}>{words[i]}</span>
}
