const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET /users/profile (already done)

const updateProfile = async (req, res) => {
    const userId = req.user._id;

    const { name, email, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields only if sent
        if (name) user.name = name;
        if (email) user.email = email.toLowerCase();
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProfile = async (req, res) => {
    res.json(req.user); // already loaded by middleware
};

module.exports = { getProfile, updateProfile };
