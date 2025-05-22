const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// 👤 Get current user's profile
const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found in database" });
      }
  
      console.log("✅ User found:", user.email);
      res.json(user);
    } catch (err) {
      console.error("❌ getProfile error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };  

// 🔄 Update current user's profile
const updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user?.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (name) user.name = name;
      if (email) user.email = email.toLowerCase();
      if (password) {
        user.password = password; // 🔒 Let Mongoose hook hash it
      }
  
      await user.save();
  
      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error("❌ [updateProfile] Error:", err.message);
      res.status(500).json({ message: err.message });
    }
  };
  

// 🔍 Admin: get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔍 Admin: get single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🛠 Admin: update user role
const updateUserRole = async (req, res) => {
    const { role } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        const { _id, name, email, role: updatedRole, createdAt } = user;

        res.json({
            message: 'User role updated successfully',
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

// ❌ Admin: delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🎟 Standard User: Get my bookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('event', 'title date location')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch bookings' });
    }
};

// 📅 Organizer: Get my events
const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user.id }).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch events' });
    }
};

// 📈 Organizer: Get event analytics
const getEventAnalytics = async (req, res) => {
    try {
        const myEvents = await Event.find({ organizer: req.user.id }).select('_id title totalTickets');

        const analytics = await Promise.all(
            myEvents.map(async (event) => {
                const totalBookings = await Booking.countDocuments({ event: event._id });
                const percentBooked = event.totalTickets === 0
                    ? 0
                    : Math.round((totalBookings / event.totalTickets) * 100);

                return {
                    eventId: event._id,
                    title: event.title,
                    percentBooked
                };
            })
        );

        res.json(analytics);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch analytics' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getMyBookings,
    getMyEvents,
    getEventAnalytics
};
