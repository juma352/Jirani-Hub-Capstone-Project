import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/Db.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();
// Connect to the database
connectDB();
// Import necessary modules
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to JiraniHub API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
