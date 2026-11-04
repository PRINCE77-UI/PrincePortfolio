import useTheme from '../hooks/useTheme.js'
import Loader from './Loader.jsx'
// import CursorGlow from './CursorGlow.jsx'
import ScrollUI from './ScrollUI.jsx'
import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import About from './About.jsx'
import Skills from './Skills.jsx'
import Projects from './Projects.jsx'
import Journey from './Journey.jsx'
import ResumeSection from './ResumeSection.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

export default function Home() {
  const [theme, toggleTheme] = useTheme()
  return (
    <>
      <a href="#about" className="skip">Skip to content</a>
      <Loader />
      <div className="bg" aria-hidden="true" />
      {/* <CursorGlow /> */}
      <ScrollUI />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
