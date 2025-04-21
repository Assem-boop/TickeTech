const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sendOtpRoute = require('./routes/forgotPassword/sendOtp');
const verifyOtpRoute = require('./routes/forgotPassword/verifyOtp');
const resetPasswordRoute = require('./routes/forgotPassword/resetPassword');
const eventRoutes = require('./routes/events'); 

app.use('/api/v1', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/forgot-password/send-otp', sendOtpRoute);
app.use('/api/v1/forgot-password/verify-otp', verifyOtpRoute);
app.use('/api/v1/forgot-password/reset-password', resetPasswordRoute);
app.use('/api/v1/events', eventRoutes); 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error('Database connection error:', err.message);
});
