import { useEffect, useState } from 'react'

export default function Loader() {
  const [state, setState] = useState('show')

  useEffect(() => {
    const t1 = setTimeout(() => setState('leave'), 900)
    const t2 = setTimeout(() => setState('gone'), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (state === 'gone') return null
  return (
    <div className={`loader ${state === 'leave' ? 'leave' : ''}`} aria-hidden="true">
      <span className="loader-mark">PK<i /></span>
    </div>
  )
}
