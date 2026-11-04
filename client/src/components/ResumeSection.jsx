import { profile } from '../data/profile.js'
import { DownloadIcon, ExternalIcon } from './Icons.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function ResumeSection() {
  return (
    <section id="resume" className="section container">
      <SectionHead index="05" eyebrow="Resume" title="The short version, on one page." />
      <Reveal className="card resume-card">
        <div>
          <h3>Prince_Kumar_Resume.pdf</h3>
          <p>Education, skills, projects, internships and certifications — everything above, in a single printable page.</p>
        </div>
        <div className="cta">
          <a className="btn primary" href={profile.resume} target="_blank" rel="noopener noreferrer"><ExternalIcon /> View</a>
          <a className="btn ghost" href={profile.resume} download="Prince_Kumar_Resume.pdf"><DownloadIcon /> Download</a>
        </div>
      </Reveal>
    </section>
  )
}
