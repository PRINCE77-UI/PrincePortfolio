import { experience, education, certifications } from '../data/timeline.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

function Timeline({ title, items }) {
  return (
    <div className="tl-col">
      <h3 className="tl-title">{title}</h3>
      <ol className="timeline">
        {items.map((it, i) => (
          <Reveal as="li" key={it.title} className="tl-item" delay={i * 100}>
            <span className="tl-dot" aria-hidden="true" />
            <span className="tl-period">{it.period}</span>
            <h4>{it.title}</h4>
            <p className="tl-org">{it.org}</p>
            <p>{it.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="section container">
      <SectionHead index="04" eyebrow="Journey" title="Experience, education & learning." />
      <div className="tl-grid">
        <Timeline title="Experience" items={experience} />
        <Timeline title="Education" items={education} />
      </div>
      <Reveal className="certs">
        <h3 className="tl-title">Certifications & courses</h3>
        <div className="cert-grid">
          {certifications.map((c) => (
            <div key={c.issuer} className="card cert">
              <h4>{c.issuer}</h4>
              <ul className="chips small">{c.items.map((x) => <li key={x} className="chip">{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
