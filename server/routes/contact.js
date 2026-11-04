import { Router } from 'express'
import crypto from 'node:crypto'
import Message from '../models/Message.js'
import { connectDB } from '../db.js'
import { notifyOwner } from '../utils/notify.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s-]{6,17}$/

function requireAdmin(req, res, next) {
  const key = process.env.ADMIN_KEY
  if (!key) return res.status(404).json({ error: 'Not found.' })
  const given = Buffer.from(String(req.get('x-admin-key') || ''))
  const real = Buffer.from(key)
  if (given.length !== real.length || !crypto.timingSafeEqual(given, real)) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  next()
}

router.post('/', async (req, res) => {
  try {
    const { name, email, message, phone = '', subject = '', website = '' } = req.body || {}

    if (typeof website === 'string' && website.trim()) return res.status(201).json({ success: true })

    if ([name, email, message].some((v) => typeof v !== 'string' || !v.trim())) {
      return res.status(400).json({ error: 'Name, email and message are all required.' })
    }
    if (typeof phone !== 'string' || typeof subject !== 'string') {
      return res.status(400).json({ error: 'Invalid phone or subject.' })
    }
    if (name.length > 100 || email.length > 150 || message.length > 2000 || subject.length > 150) {
      return res.status(400).json({ error: 'One of the fields is too long.' })
    }
    if (!EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }
    if (phone.trim() && !PHONE_RE.test(phone.trim())) {
      return res.status(400).json({ error: 'Please enter a valid phone number.' })
    }

    await connectDB()

    const now = Date.now()
    const [sameEmail, lastHour] = await Promise.all([
      Message.countDocuments({ email: email.trim().toLowerCase(), createdAt: { $gte: new Date(now - 15 * 60 * 1000) } }),
      Message.countDocuments({ createdAt: { $gte: new Date(now - 60 * 60 * 1000) } }),
    ])
    if (sameEmail >= 3 || lastHour >= 30) {
      return res.status(429).json({ error: 'Too many messages right now. Please try again later.' })
    }

    const saved = await Message.create({ name, email, phone, subject, message })

    try {
      await notifyOwner({ name, email, phone, subject, message })
    } catch (err) {
      console.error('Telegram notification failed:', err.message)
    }

    return res.status(201).json({ success: true, id: saved._id })
  } catch (err) {
    console.error('Error saving contact message:', err.message)
    return res.status(500).json({ error: 'Could not save your message. Please try again later.' })
  }
})

router.get('/', requireAdmin, async (req, res) => {
  try {
    await connectDB()
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100)
    return res.json(messages)
  } catch (err) {
    console.error('Error fetching messages:', err.message)
    return res.status(500).json({ error: 'Could not fetch messages.' })
  }
})

export default router