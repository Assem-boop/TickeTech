const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Otp = require('../../models/Otp');
const bcrypt = require('bcryptjs');

router.put('/', async (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
        return res.status(400).json({ message: "Email, code and new password are required" });
    }

    try {
        const otpDoc = await Otp.findOne({ email: email.toLowerCase(), code });

        if (!otpDoc) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (otpDoc.expiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        // Remove OTP after use
        await Otp.deleteMany({ email: email.toLowerCase() });

        res.status(200).json({ message: "Password has been reset successfully" });

    } catch (err) {
        console.error("❌ Password reset error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
