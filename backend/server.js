const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const pool = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const listingRoutes = require('./routes/listingRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/listings', listingRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Second-hand Vehicle Backend is Running');
});

// Error Handling Middleware
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
