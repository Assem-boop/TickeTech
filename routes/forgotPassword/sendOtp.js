
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Otp = require('../../models/Otp');
const sendEmail = require('../../utils/sendEmail');
const generateOtpEmail = require('../../utils/sendOtpEmailTemplate'); // ✅ new import

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ email: email.toLowerCase() });

    const otp = new Otp({
      email: email.toLowerCase(),
      code,
      expiresAt: expiration,
    });

    await otp.save();

    await sendEmail(
      email,
      'Reset Code',
      generateOtpEmail(user.name || user.email, code) // ✅ use the new styled template
    );

    res.status(200).json({ message: 'Code sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;