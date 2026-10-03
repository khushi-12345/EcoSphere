const express = require('express');
const router = express.Router();
const { calculateCarbon, getMyHistory } = require('../controllers/carbonController');
const { protect } = require('../middleware/authMiddleware');

// All routes protected
router.post('/calculate', protect, calculateCarbon);
router.get('/my', protect, getMyHistory);

module.exports = router;