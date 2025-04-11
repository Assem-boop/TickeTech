// routes/users.js
const express = require('express');
const router = express.Router();

// Test user route
router.get('/test-user', (req, res) => {
  res.send("User route working ✅");
});

module.exports = router;
