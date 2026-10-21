import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import mainRouter from './src/api/main.routes.js';
import errorHandler from './src/middleware/error.handler.js';

const app = express();
// Priority to process.env.PORT for cPanel / Node.js Passenger environment
const PORT = process.env.PORT || process.env.PASSENGER_PORT || 5000;

// Configure CORS allowed origins for both local development and production domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://hanastack.com',
  'https://www.hanastack.com',
  process.env.FRONTEND_URL
].filter(Boolean);

// Apply CORS middleware with explicit origin checking
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman, mobile apps, or server-to-server calls)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS policy for origin: ${origin}`);
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Health Check Route to verify backend deployment status
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running successfully!' });
});

// Main API Routes entry point
app.use('/api', mainRouter);

// Global Error Handler Middleware
app.use(errorHandler);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});