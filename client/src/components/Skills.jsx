import { skillGroups } from '../data/skills.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section container">
      <SectionHead index="02" eyebrow="Skills" title="The toolkit I work with." />
      <div className="bento">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} className={`card skill-card s${i}`} delay={(i % 3) * 80}>
            <h3><span className="skill-ico" aria-hidden="true">{g.icon}</span>{g.title}</h3>
            <ul className="chips">
              {g.items.map((it) => {
                const item = typeof it === 'string' ? { name: it } : it
                return (
                  <li key={item.name} className={item.learning ? 'chip learning' : 'chip'}>
                    {item.name}{item.learning && <em> · learning</em>}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
