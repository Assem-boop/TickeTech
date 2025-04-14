const express = require('express');
const router = express.Router();

const {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser
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

// Admin-only: Get all users
router.get('/', protect, authorizeRoles('Admin'), getAllUsers);

// Admin-only: Get single user
router.get('/:id', protect, authorizeRoles('Admin'), getUserById);

// Admin-only: Update user role
router.put('/:id', protect, authorizeRoles('Admin'), updateUserRole);

// Admin-only: Delete user
router.delete('/:id', protect, authorizeRoles('Admin'), deleteUser);

module.exports = router;
