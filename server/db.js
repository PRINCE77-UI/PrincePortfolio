import mongoose from 'mongoose'

let connecting

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return
  if (!connecting) {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prince-portfolio'
    connecting = mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 }).catch((err) => {
      connecting = undefined
      throw err
    })
  }
  await connecting
}