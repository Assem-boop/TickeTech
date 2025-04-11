// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Register route
router.post('/register', registerUser);

// Temp test route (optional)
router.get('/test-auth', (req, res) => {
    res.send("Auth route working ✅");
});

module.exports = router;
