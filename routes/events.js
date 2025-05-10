const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { protect, authorizeRoles } = require('../middleware/auth');

router.get("/", eventController.getApprovedEvents);
router.get("/all", protect, authorizeRoles("Admin"), eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", protect, authorizeRoles("Organizer"), eventController.createEvent);
router.put("/:id", protect, authorizeRoles("Organizer", "Admin"), eventController.updateEvent);
router.put("/:id/status", protect, authorizeRoles("Admin"), eventController.updateStatus);
router.delete("/:id", protect, authorizeRoles("Organizer", "Admin"), eventController.deleteEvent);

module.exports = router;
