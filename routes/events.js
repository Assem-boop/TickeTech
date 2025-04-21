const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

router.get("/", eventController.getApprovedEvents);
router.get("/all", authMiddleware, authorizeRoles("admin"), eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

router.post("/", authMiddleware, authorizeRoles("organizer"), eventController.createEvent);

router.put("/:id", authMiddleware, authorizeRoles("organizer", "admin"), eventController.updateEvent);
router.put("/:id/status", authMiddleware, authorizeRoles("admin"), eventController.updateStatus);

router.delete("/:id", authMiddleware, authorizeRoles("organizer", "admin"), eventController.deleteEvent);

module.exports = router;
