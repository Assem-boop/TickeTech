const express = require('express');
const router = express.Router();
const Otp = require('../../models/Otp');

router.post('/', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: "Email and code are required" });
    }

    try {
        // Get OTP doc
        const otpDoc = await Otp.findOne({ email: email.toLowerCase(), code });

        if (!otpDoc) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (otpDoc.expiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        // OTP is valid
        res.status(200).json({ message: "OTP verified successfully" });

    } catch (err) {
        console.error("❌ OTP verification failed:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
