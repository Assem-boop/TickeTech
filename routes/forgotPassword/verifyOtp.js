const express = require('express');
const router = express.Router();
const Otp = require('../../models/Otp');

router.post('/', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: 'Email and code are required' });
    }

    try {
        const record = await Otp.findOne({ email: email.toLowerCase(), code });

        if (!record) {
            return res.status(400).json({ message: 'Invalid code' });
        }

        if (record.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Code expired' });
        }

        res.status(200).json({ message: 'Code verified' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
