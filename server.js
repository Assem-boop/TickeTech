// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (will be added later)
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
app.use('/api/v1', authRoutes);
app.use('/api/v1/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(process.env.PORT, () =>
        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
}).catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
});

const sendOtpRoute = require('./routes/forgotPassword/sendOtp');
app.use('/api/v1/forgot-password/send-otp', sendOtpRoute);
