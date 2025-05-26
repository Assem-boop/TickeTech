const express = require('express');
const router = express.Router();
const {
  createBooking,
  cancelBooking,
  getBookingById,
} = require('../controllers/bookingController');
const { protect, authorizeRoles } = require('../middleware/auth');


router.use(protect);

router.post('/', createBooking);              
router.get('/:id', getBookingById);           
router.delete('/:id', cancelBooking);          
    

module.exports = router;
