import { useEffect, useState } from 'react'

export default function useTyping(words, { type = 70, erase = 35, hold = 1600 } = {}) {
  const [text, setText] = useState(words[0])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let w = 0, i = 0, deleting = false, timer
    const step = () => {
      const word = words[w]
      i += deleting ? -1 : 1
      setText(word.slice(0, i))
      let wait = deleting ? erase : type
      if (!deleting && i === word.length) { deleting = true; wait = hold }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; wait = 350 }
      timer = setTimeout(step, wait)
    }
    timer = setTimeout(step, hold)
    return () => clearTimeout(timer)
  }, [words, type, erase, hold])

  return text
}
