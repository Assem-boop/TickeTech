const express = require('express');
const router = express.Router();
const {
  createBooking,
  cancelBooking,
  getBookingById,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');


router.use(protect);

router.post('/', createBooking);              
router.get('/:id', getBookingById);           
router.delete('/:id', cancelBooking);          
    

module.exports = router;
