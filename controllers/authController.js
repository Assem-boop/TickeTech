const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// ===================================
// REGISTER USER
// ===================================
const registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    email = email.toLowerCase();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ DO NOT hash manually — Mongoose will handle it
        const newUser = await User.create({
            name,
            email,
            password
        });

        console.log("🆕 Registered user:", newUser);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

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

// ===================================
// LOGIN USER
// ===================================
const loginUser = async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    try {
        console.log("🔐 Login attempt for:", email);
        console.log("📩 Provided password:", password);

        const user = await User.findOne({ email });
        console.log("🧑 User found in DB:", user);

        if (!user) {
            console.log("❌ No user found with that email");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🆚 Comparing:", password, "with", user.password);
        console.log("🔍 Password match result:", isMatch);

        if (!isMatch) {
            console.log("❌ Password incorrect");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        console.log("✅ Login successful - token created");

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("💥 Login Error:", err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser };
