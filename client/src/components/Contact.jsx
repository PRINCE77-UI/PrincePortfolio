import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'
import { MailIcon, PhoneIcon, PinIcon, GitHubIcon, LinkedInIcon, CopyIcon, CheckIcon, SendIcon } from './Icons.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const API = `${import.meta.env.VITE_API_URL || ''}/api/contact`
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s-]{6,17}$/
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

function validate({ name, email, phone, message }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (phone.trim() && !PHONE_RE.test(phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', text: '' })
  const [copied, setCopied] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }
  useEffect(() => {
    if (status.type !== 'success' && status.type !== 'error') return
    const t = setTimeout(() => setStatus({ type: 'idle', text: '' }), 4000)
    return () => clearTimeout(t)
  }, [status])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus({ type: 'sending', text: 'Sending…' })

    // Subject and phone are added on top of the message, so the existing backend works unchanged.
    // const extra = []
    // if (form.subject.trim()) extra.push(`Subject: ${form.subject.trim()}`)
    // if (form.phone.trim()) extra.push(`Phone: ${form.phone.trim()}`)
    // const message = extra.length ? `${extra.join('\n')}\n\n${form.message.trim()}` : form.message.trim()

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setForm(EMPTY)
      setStatus({ type: 'success', text: 'Thanks! Your message is on its way to me — I’ll reply soon.' })
    } catch (err) {
      const offline = err instanceof TypeError
      setStatus({ type: 'error', text: offline ? 'Couldn’t reach the server. Please try again, or email me directly.' : err.message })
    }
  }

  const field = (id, label, { type = 'text', placeholder = '', autoComplete, as, wide } = {}) => (
    <div className={`field ${wide ? 'wide' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {as === 'textarea' ? (
        <textarea id={id} name={id} rows={6} placeholder={placeholder} value={form[id]} onChange={onChange}
          aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} maxLength={1800} />
      ) : (
        <input id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete} value={form[id]} onChange={onChange}
          aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} maxLength={150} />
      )}
      {errors[id] && <span id={`${id}-err`} className="err">{errors[id]}</span>}
    </div>
  )

  return (
    <section id="contact" className="section container">
      <SectionHead index="06" eyebrow="Contact" title="Let’s build something together." />
      <div className="contact-grid">
        <Reveal className="card contact-info">

          <p>Open to internships, collaborations and interesting problems. The quickest way to reach me:</p>
          <ul>
            <li className="has-copy">
              <a href={`mailto:${profile.email}`}><MailIcon />{profile.email}</a>
              <button type="button" className="copy-btn" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </li>
            {/* <li><a href={profile.phoneHref}><PhoneIcon />{profile.phone}</a></li> */}
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon />LinkedIn</a></li>
            <li><a href={profile.github} target="_blank" rel="noopener noreferrer"><GitHubIcon />GitHub</a></li>
            <li><span><PinIcon />{profile.location}</span></li>
          </ul>



          <div className="open-box">
            <strong><span className="dot" aria-hidden="true" /> Open to Work</strong>
            <p>Looking for internships and opportunities in software development and AI/ML.</p>
          </div>
        </Reveal>

        <Reveal className="card contact-form" delay={100}>
          <h3>Send a Message</h3>
          <form onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              {field('name', 'Your Name', { placeholder: 'Your name', autoComplete: 'name' })}
              {field('email', 'Your Email Address', { type: 'email', placeholder: 'abc@gmail.com', autoComplete: 'email' })}
              {field('phone', 'Phone Number (optional)', { type: 'tel', placeholder: '+91 98765 43210', autoComplete: 'tel' })}
              {field('subject', 'Subject (optional)', { placeholder: 'Project collaboration…' })}
              {field('message', 'Message', { as: 'textarea', wide: true, placeholder: 'Tell me about your project or opportunity…' })}
            </div>
            <button type="submit" className="btn primary send-btn" disabled={status.type === 'sending'}>
              <SendIcon /> {status.type === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {/* <p className={`status ${status.type}`} role="status" aria-live="polite">
              {status.type === 'success' || status.type === 'error' ? status.text : ''}
            </p> */}
          </form>
        </Reveal>
      </div>
      {(status.type === 'success' || status.type === 'error') && (
        <div className={`toast ${status.type}`} role="status" aria-live="polite">
          <span className="toast-ico">{status.type === 'success' ? <CheckIcon /> : '!'}</span>
          <p>{status.text}</p>
        </div>
      )}
    </section>
  )
}