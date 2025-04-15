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

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.get('/admin-test', protect, authorizeRoles('Admin'), (req, res) => {
    res.json({
        message: 'Admin-only route accessed',
        user: req.user
    });
});

router.get('/', protect, authorizeRoles('Admin'), getAllUsers);
router.get('/:id', protect, authorizeRoles('Admin'), getUserById);
router.put('/:id', protect, authorizeRoles('Admin'), updateUserRole);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteUser);

module.exports = router;
