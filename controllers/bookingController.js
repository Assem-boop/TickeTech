const Booking = require('../models/Booking');
const Event = require('../models/Event');


exports.createBooking = async (req, res) => {
  try {
    const { eventId, numberOfTickets, totalPrice } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.remainingTickets < numberOfTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      numberOfTickets,
      totalPrice,
    });

    event.remainingTickets -= numberOfTickets;
    await event.save();

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("❌ Booking error:", error);
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
