const express = require('express');
const router = express.Router();

const {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getMyBookings,
    getMyEvents,
    getEventAnalytics
} = require('../controllers/userController');

const { protect, authorizeRoles } = require('../middleware/auth');

// ✅ These map to: /api/v1/users/profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// 🎟 Bookings (Standard)
router.get('/bookings', protect, authorizeRoles('Standard'), getMyBookings);

// 📅 Organizer
router.get('/events', protect, authorizeRoles('Organizer'), getMyEvents);
router.get('/events/analytics', protect, authorizeRoles('Organizer'), getEventAnalytics);

// 🛠 Admin
router.get('/', protect, authorizeRoles('Admin'), getAllUsers);
router.get('/:id', protect, authorizeRoles('Admin'), getUserById);
router.put('/:id', protect, authorizeRoles('Admin'), updateUserRole);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteUser);

module.exports = router;
