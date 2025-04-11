const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Protected route to test token
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Protected route accessed ✅',
    user: req.user
  });
});

module.exports = router;
