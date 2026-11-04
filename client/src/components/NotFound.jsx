import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Page not found — Prince Kumar'
    return () => { document.title = prev }
  }, [])
  return (
    <main className="notfound">
      <div className="bg" aria-hidden="true" />
      <p className="nf-code">404</p>
      <h1>This page wandered off.</h1>
      <p>The link may be broken or the page may have moved.</p>
      <Link to="/" className="btn primary">Back to portfolio</Link>
    </main>
  )
}
