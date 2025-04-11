const express = require('express');
const router = express.Router();

const {
    getProfile,
    updateProfile
} = require('../controllers/userController');

const {
    protect,
    authorizeRoles
} = require('../middleware/auth');

// ✅ GET: Logged-in user's profile
router.get('/profile', protect, getProfile);

// ✅ PUT: Update profile info (name, email, password)
router.put('/profile', protect, updateProfile);

// ✅ GET: Admin-only test route
router.get('/admin-test', protect, authorizeRoles('Admin'), (req, res) => {
    res.json({
        message: "✅ Admin-only route accessed",
        user: req.user
    });
});

module.exports = router;
