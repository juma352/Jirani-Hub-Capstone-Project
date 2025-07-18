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

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://jirani-hub-capstone-project.vercel.app',
      'https://jirani-hub-frontend.vercel.app',
      'https://jirani-hub.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed or matches Vercel pattern
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware to parse JSON bodies
app.use(express.json())

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Apply CORS middleware
app.use(cors(corsOptions))

// Add preflight handling for all routes
app.options('*', cors(corsOptions));

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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
    origin: [
      'https://jirani-hub-capstone-project.vercel.app',
      'https://jirani-hub-frontend.vercel.app', 
      'https://jirani-hub.vercel.app',
      'http://localhost:5173', 
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
