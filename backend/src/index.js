// backend/src/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// Load environment variables
dotenv.config()

// Initialize Prisma Client (Prisma 7 requires a driver adapter)
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())          // Parse JSON bodies
app.use(cookieParser())          // Parse cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,           // Allow cookies to be sent
  })
)

// Health check endpoint (useful for Render)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' })
})

// Root route
app.get('/', (req, res) => {
  res.send('Fixxy Backend API')
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('Disconnected from database')
  process.exit(0)
})
