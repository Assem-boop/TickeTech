const Booking = require('../models/Booking');
const Event = require('../models/Event');


exports.createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableTickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const totalPrice = quantity * event.price;

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      quantity,
      totalPrice,
    });

    event.availableTickets -= quantity;
    await event.save();

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const event = await Event.findById(booking.event);
    if (event) {
      event.availableTickets += booking.quantity;
      await event.save();
    }

    await booking.deleteOne();

    res.status(200).json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
