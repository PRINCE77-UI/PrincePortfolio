import { useState } from 'react'
import { categories, projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section container">
      <SectionHead index="03" eyebrow="Projects" title="Things I’ve built." />
      <Reveal className="tabs" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button key={c} type="button" className={filter === c ? 'tab on' : 'tab'} aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c === 'AI-ML' ? 'AI / ML' : c}
          </button>
        ))}
      </Reveal>
      <div className="project-grid">
        {list.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
    </section>
  )
}
