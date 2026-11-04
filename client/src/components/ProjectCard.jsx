import { useRef } from 'react'
import { profile } from '../data/profile.js'
import { GitHubIcon, ExternalIcon } from './Icons.jsx'

export default function ProjectCard({ project }) {
  const ref = useRef(null)
  const canTilt = () =>
    window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    if (!canTilt()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const { title, year, category, stack, description, repo, live } = project

  return (
    <article ref={ref} className="card project" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="project-top">
        <span className={`badge ${category === 'AI-ML' ? 'ai' : ''}`}>{category === 'AI-ML' ? 'AI / ML' : category}</span>
        <span className="year">{year}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="chips small">
        {stack.map((s) => <li key={s} className="chip">{s}</li>)}
      </ul>
      <div className="project-links">
        <a href={repo || profile.github} target="_blank" rel="noopener noreferrer" className="btn mini">
          <GitHubIcon /> {repo ? 'GitHub' : 'More on GitHub'}
        </a>
        {live && (
          <a href={live} target="_blank" rel="noopener noreferrer" className="btn mini primary">
            <ExternalIcon /> Live
          </a>
        )}
      </div>
    </article>
  )
}
