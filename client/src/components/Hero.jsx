import { profile } from '../data/profile.js'
import useTyping from '../hooks/useTyping.js'
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, ArrowIcon, DownloadIcon } from './Icons.jsx'

export default function Hero() {
  const role = useTyping(profile.roles)

  return (
    <section id="home" className="hero container">
      <div className="hero-copy">
        <p className="hello"><span className="dot" /> Open to internships & opportunities</p>
        <h1>
          Hi, I’m <span className="grad">Prince</span>
          <br />Kumar.
        </h1>
        <p className="role" aria-label={profile.roles.join(', ')}>
          <span aria-hidden="true">{role}</span><span className="caret" aria-hidden="true" />
        </p>
        <p className="lead">{profile.intro}</p>
        <div className="cta">
          <a className="btn primary" href="#projects">View Projects <ArrowIcon /></a>
          <a className="btn ghost" href={profile.resume} download="Prince_Kumar_Resume.pdf"><DownloadIcon /> Resume</a>
          <a className="btn ghost" href="#contact">Contact Me</a>
        </div>
        <div className="socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
          <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile"><LeetCodeIcon /></a>
        </div>
      </div>

      <div className="hero-art">
        <div className="frame">
          <div className="frame-ring" aria-hidden="true" />
          <img src="/prince.webp" width="720" height="942" alt="Portrait of Prince Kumar in a dark suit and burgundy tie" fetchPriority="high" />
        </div>
        {/* <span className="chip float c1">CGPA 8.95</span>
        <span className="chip float c2">React · Node · Python</span>
        <span className="chip float c3">Rajkot, IN</span> */}
      </div>
    </section>
  )
}
