import express from 'express'
import cors from 'cors'
import contactRoutes from './routes/contact.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongo: Boolean(process.env.MONGODB_URI),
    telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
  })
})

app.use('/api/contact', contactRoutes)
// Visitor's city/country, from the location headers Vercel adds to every request
app.get('/api/location', (req, res) => {
  const decode = (v) => {
    try { return decodeURIComponent(v || '') } catch { return '' }
  }
  res.set('Cache-Control', 'no-store')
  res.json({
    city: decode(req.headers['x-vercel-ip-city']),
    country: req.headers['x-vercel-ip-country'] || '',
  })
})

export default app