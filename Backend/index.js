import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import mainRouter from './src/api/main.routes.js';
import errorHandler from './src/middleware/error.handler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Main API Route
app.use('/api', mainRouter);

// Global Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});