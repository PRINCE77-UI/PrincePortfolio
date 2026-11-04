import Reveal from './Reveal.jsx'

export default function SectionHead({ index, eyebrow, title }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow"><b>{index}</b> {eyebrow}</span>
      <h2>{title}</h2>
    </Reveal>
  )
}
