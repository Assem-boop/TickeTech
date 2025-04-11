// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// helper to generate token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 4. Return token + basic user info
        const token = generateToken(newUser._id);
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser };
