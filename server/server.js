import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/Db.js'
import authRoutes from './routes/authRoutes.js'
import listingRoutes from './routes/listingRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import alertRoutes from './routes/alertRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

import http from 'http'
import { Server } from 'socket.io'

// Load environment variables
dotenv.config()
// Connect to the database
connectDB()
// Import necessary modules
const app = express()

import path from 'path';

// Middleware to parse JSON bodies
app.use(express.json())

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Implement CORS middleware with options
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://jirani-hub.vercel.app', 'https://your-custom-domain.com']
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

//Mount routes
app.use('/api/auth', authRoutes)
app.use('/api/listings', listingRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/alerts', alertRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/announcements', announcementRoutes)
app.use('/api/chats', chatRoutes)

// Define a simple route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to JiraniHub API',
        status: 'Server is running',
        environment: process.env.NODE_ENV || 'development'
    })
})

const PORT = process.env.PORT || 5000
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://jirani-hub.vercel.app', 'https://your-custom-domain.com']
        : 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId)
    console.log(`Socket ${socket.id} joined room ${roomId}`)
  })

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
