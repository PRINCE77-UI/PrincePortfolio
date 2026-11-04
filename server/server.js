import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './db.js'

dotenv.config()
const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })