const express = require('express');
const router = express.Router();
const {
  createBooking,
  cancelBooking,
  getUserBookings,
  getBookingById,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.post('/', createBooking);               // POST /api/v1/bookings
router.get('/:id', getBookingById);            // GET /api/v1/bookings/:id
router.delete('/:id', cancelBooking);          // DELETE /api/v1/bookings/:id
router.get('/user/me', getUserBookings);       // GET /api/v1/bookings/user/me (your own bookings)

module.exports = router;
