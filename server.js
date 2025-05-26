const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
  console.log("Incoming content-type:", req.headers["content-type"]);
  console.log(" Incoming content-type:", req.headers["content-type"]);
  next();
});

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sendOtpRoute = require('./routes/forgotPassword/sendOtp');
const verifyOtpRoute = require('./routes/forgotPassword/verifyOtp');
const resetPasswordRoute = require('./routes/forgotPassword/resetPassword');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');

app.use('/api/v1', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/forgot-password/send-otp', sendOtpRoute);
app.use('/api/v1/forgot-password/verify-otp', verifyOtpRoute);
app.use('/api/v1/forgot-password/reset-password', resetPasswordRoute);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/bookings', bookingRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  console.log(' Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(` Server running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('Database connection error:', err.message);
  console.error(' Database connection error:', err.message);
});
