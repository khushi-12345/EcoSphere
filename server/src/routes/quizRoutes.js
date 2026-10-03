const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getQuizzes);
router.route('/:id').get(protect, getQuizById); // Protected so only users can take it
router.post('/submit', protect, submitQuiz);

module.exports = router;