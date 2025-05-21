const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const Otp = require('../../models/Otp');
const bcrypt = require('bcryptjs');

router.put('/', async (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const otpDoc = await Otp.findOne({ email: email.toLowerCase(), code });

        if (!otpDoc) {
            return res.status(400).json({ message: 'Invalid code' });
        }

        if (otpDoc.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Code expired' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        await Otp.deleteMany({ email: email.toLowerCase() });

        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
