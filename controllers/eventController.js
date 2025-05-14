const Event = require("../models/Event");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.status !== "approved") return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      totalTickets,
      ticketPricing,
      remainingTickets,
      organizer,
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      totalTickets,
      ticketPricing,
      remainingTickets,
      organizer: organizer || req.user._id,
    });

    const savedEvent = await newEvent.save();
    console.log("✅ Event saved successfully:", savedEvent);
    res.status(201).json(savedEvent); 
  } catch (err) {
    console.error("❌ Event creation error:", err.message);
    res.status(400).json({ message: err.message });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    console.log("🧠 DELETE request from:", req.user);
    const event = await Event.findById(req.params.id);

    if (!event) {
      console.warn("⚠️ Event not found:", req.params.id);
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("🗑️ Attempting to delete event:", event._id);
    console.log("🛡️ Organizer of event:", event.organizer);
    console.log("🔐 Requester:", req.user.id);

    if (
      event.organizer.toString() !== req.user.id.toString() &&
      req.user.role.toLowerCase() !== "admin"
    ) {
      console.warn("⛔ Unauthorized delete attempt");
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err.message);
    res.status(500).json({ message: "Server error while deleting event" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.status = req.body.status;
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
