const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// GET current user's profile (protected)
router.get('/profile', protect, getProfile);

// PUT update current user's profile (protected)
router.put('/profile', protect, updateProfile);

module.exports = router;
