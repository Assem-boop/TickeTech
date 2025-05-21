const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { protect, authorizeRoles } = require("../middleware/auth");

router.post("/", protect, authorizeRoles("Organizer"), eventController.createEvent);

router.get("/", eventController.getApprovedEvents);

router.get("/all", protect, authorizeRoles("Admin"), eventController.getAllEvents);

router.get("/:id", eventController.getEventById);

router.put("/:id", protect, authorizeRoles("Organizer", "Admin"), eventController.updateEvent);
router.delete("/:id", protect, authorizeRoles("Organizer", "Admin"), eventController.deleteEvent);

router.put("/:id/status", protect, authorizeRoles("Admin"), eventController.updateStatus);

module.exports = router;
