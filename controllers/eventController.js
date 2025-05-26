const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const authHeader = req.headers.authorization;
    let decoded = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        decoded = null;
      }
    }

    const isOwner = decoded && event.organizer.toString() === decoded.id;
    const isApproved = event.status === "approved";

    if (!isApproved && !isOwner) {
      return res.status(403).json({ message: "Not authorized to view this event" });
    }

    res.json(event);
  } catch (err) {
    console.error("❌ Error in getEventById:", err.message);
    res.status(500).json({ message: "Server error" });
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
      remainingTickets: totalTickets, // ✅ Automatically match total
      organizer: organizer || req.user._id,
      status: "pending",
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

    if (
      event.organizer.toString() !== req.user.id.toString() &&
      req.user.role.toLowerCase() !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const isAdmin = req.user.role.toLowerCase() === "admin";
    const { status, totalTickets, ...otherUpdates } = req.body;

    Object.assign(event, otherUpdates);

    if (typeof totalTickets !== "undefined") {
      const ticketsUsed = event.totalTickets - event.remainingTickets;
      const newRemaining = totalTickets - ticketsUsed;
      event.totalTickets = totalTickets;
      event.remainingTickets = Math.max(newRemaining, 0); // ✅ prevent negative
    }

    if (!isAdmin) {
      event.status = "pending";
    } else if (status) {
      event.status = status;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error("❌ Update Event Error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      event.organizer.toString() !== req.user.id.toString() &&
      req.user.role.toLowerCase() !== "admin"
    ) {
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
