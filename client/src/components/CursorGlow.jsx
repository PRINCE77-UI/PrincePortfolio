import { useEffect } from 'react'

// Soft spotlight that follows the mouse (fine pointers only, rAF-throttled).
export default function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    let raf = 0, x = 0, y = 0
    const onMove = (e) => {
      x = e.clientX; y = e.clientY
      if (!raf) raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${x}px`)
        root.style.setProperty('--my', `${y}px`)
        raf = 0
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return <div className="cursor-glow" aria-hidden="true" />
}
