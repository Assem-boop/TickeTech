const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Otp = require('../../models/Otp');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "No user with this email" });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Remove old OTPs for same email
        await Otp.deleteMany({ email: email.toLowerCase() });

        // Save new OTP
        const otp = new Otp({
            email: email.toLowerCase(),
            code: otpCode,
            expiresAt
        });
        await otp.save();

        // Send via email
        await sendEmail(
            email,
            "Your Ticketech Password Reset Code",
            `Your OTP code is: ${otpCode}. It will expire in 5 minutes.`
        );

        res.status(200).json({ message: "OTP sent successfully" });

    } catch (err) {
        console.error("❌ OTP error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
