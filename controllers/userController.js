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

// GET all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET user by ID (Admin only)
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE user role (Admin only)
const updateUserRole = async (req, res) => {
    const { role } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = role;
        await user.save();

        // Exclude password from response
        const { _id, name, email, role: updatedRole, createdAt } = user;

        res.json({
            message: "User role updated successfully",
            user: {
                id: _id,
                name,
                email,
                role: updatedRole,
                createdAt
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// DELETE user (Admin only)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(req.params.id);
        
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser
};
