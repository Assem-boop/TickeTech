const jwt = require('jsonwebtoken');
const User = require('../models/users');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: decoded.role 
        };

        next();
    } catch (err) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Access denied: required role ${roles}` });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };
