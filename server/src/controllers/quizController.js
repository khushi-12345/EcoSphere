const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

// @desc    Get all quizzes
// @route   GET /api/quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single quiz (Hide correct answers!)
// @route   GET /api/quizzes/:id
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // Map questions to remove 'correctAnswer' and 'explanation' for security
    const safeQuestions = quiz.questions.map(q => ({
      questionText: q.questionText,
      options: q.options
      // We do NOT send correctAnswer or explanation here
    }));

    res.json({
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      questions: safeQuestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit Quiz Attempt & Calculate Score
// @route   POST /api/quizzes/submit
const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;
    const userId = req.user.id;

    // 1. Fetch the full quiz with answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let correctCount = 0;
    const detailedAnswers = answers.map((ans, index) => {
      const correctIndex = quiz.questions[index].correctAnswer;
      const isCorrect = ans === correctIndex;
      if (isCorrect) correctCount++;

      return {
        questionIndex: index,
        selectedAnswer: ans,
        isCorrect: isCorrect
      };
    });

    // 2. Calculate Score
    const score = Math.round((correctCount / quiz.questions.length) * 100);

    // 3. Save Attempt
    const attempt = await QuizAttempt.create({
      user: userId,
      quiz: quizId,
      answers: detailedAnswers,
      score,
      timeTaken
    });

    res.status(201).json({
      score,
      correctCount,
      totalQuestions: quiz.questions.length,
      attemptId: attempt._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getQuizzes, getQuizById, submitQuiz };