import { profile } from '../data/profile.js'
import useCountUp from '../hooks/useCountUp.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

function Stat({ value, decimals, label }) {
  const [ref, shown] = useCountUp(value, decimals)
  return (
    <div className="stat">
      <strong ref={ref}>{shown}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section container">
      <SectionHead index="01" eyebrow="About" title="Building things that work, start to finish." />
      <div className="about-grid">
        <Reveal className="about-text">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
        <Reveal className="card facts" delay={120}>
          <dl>
            {profile.facts.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
      <Reveal className="stats" delay={80}>
        {profile.stats.map((s) => <Stat key={s.label} {...s} />)}
      </Reveal>
    </section>
  )
}
