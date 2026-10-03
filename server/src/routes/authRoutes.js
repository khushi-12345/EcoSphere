const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route to get user profile
router.get('/me', protect, (req, res) => {
  // In a real app, you might fetch fresh user data here
  res.status(200).json(req.user);
});

module.exports = router;