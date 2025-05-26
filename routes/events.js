const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { protect, authorizeRoles } = require("../middleware/auth");

// Organizer: Create Event
router.post("/", protect, authorizeRoles("Organizer"), eventController.createEvent);

// Public: Get Approved Events
router.get("/", eventController.getApprovedEvents);

// Admin: Get All Events
router.get("/all", protect, authorizeRoles("Admin"), eventController.getAllEvents);

// ✅ Public Route: Anyone can fetch event by ID, protect logic handled in controller
router.get("/:id", eventController.getEventById);

// Organizer/Admin: Update or Delete Event
router.put("/:id", protect, authorizeRoles("Organizer", "Admin"), eventController.updateEvent);
router.delete("/:id", protect, authorizeRoles("Organizer", "Admin"), eventController.deleteEvent);

// Admin: Update Event Status (approve/decline)
router.put("/:id/status", protect, authorizeRoles("Admin"), eventController.updateStatus);

module.exports = router;
