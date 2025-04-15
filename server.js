const express = require('express');

const app = express();

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/v1/bookings', bookingRoutes);