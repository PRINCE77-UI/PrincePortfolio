import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['journey', 'Journey'],
  ['resume', 'Resume'],
  ['contact', 'Contact'],
]

const getTime = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

// Fallback place from the visitor's time zone, e.g. "Asia/Kolkata" -> "Kolkata"
const zoneName = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  return tz.split('/').pop().replace(/_/g, ' ')
}

function LocalTime() {
  const [time, setTime] = useState(getTime())
  const [place, setPlace] = useState(zoneName())

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let alive = true
    fetch('/api/location')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !d.city) return
        let country = ''
        try {
          country = d.country ? new Intl.DisplayNames(['en'], { type: 'region' }).of(d.country) : ''
        } catch { /* ignore */ }
        setPlace(country ? `${d.city}, ${country}` : d.city)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  return (
    <p className="f-time">
      <span className="dot" aria-hidden="true" />
      {place || 'Your time'} · <time>{time}</time>
    </p>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="f-brand">
          <a href="#home" className="brand" aria-label={`${profile.name} — home`}>
            <span className="brand-mark">PK</span>
            <span className="brand-name">Prince<span className="brand-dev">.dev<i className="brand-caret" aria-hidden="true" /></span></span>
          </a>
          <p>
            Full-stack developer and AI/ML enthusiast. Open to internships,
            collaborations and real-world projects.
          </p>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <nav className="f-links" aria-label="Footer">
          <h3>Quick Links</h3>
          <ul>
            {links.map(([id, label]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="f-cta card">
          <h3>Open to Work</h3>
          <p>Looking for internships and opportunities in software development and AI/ML.</p>
          <a href="#contact" className="btn primary"><MailIcon /> Let’s Talk</a>
        </div>
      </div>

      <div className="container f-bottom">
        <p>Made with <span className="heart" aria-label="love">♥</span> by <b>Prince Kumar </b> © {new Date().getFullYear()}</p>
        <p className="thanks">THANK YOU</p>
        <LocalTime />
      </div>
    </footer>
  )
}