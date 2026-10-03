const QuizAttempt = require('../models/QuizAttempt');
const CarbonRecord = require('../models/CarbonRecord');
const User = require('../models/User');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get User
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Get Quiz History (Safely)
    // We use 'lean()' to get plain objects, which prevents population errors if data is missing
    let quizzesTaken = await QuizAttempt.find({ user: userId })
      .sort({ submittedAt: -1 })
      .limit(5)
      .lean();

    // Manually fetch quiz titles to avoid populate errors if quiz was deleted
    const Quiz = require('../models/Quiz');
    for (let attempt of quizzesTaken) {
        const quiz = await Quiz.findById(attempt.quiz).select('title').lean();
        attempt.quiz = quiz || { title: 'Deleted Quiz' };
    }

    // 3. Get Carbon History
    const carbonHistory = await CarbonRecord.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3);

    // 4. Calculate Stats
    const totalQuizzes = await QuizAttempt.countDocuments({ user: userId });
    
    // Calculate average score safely
    let avgScore = 0;
    if (totalQuizzes > 0) {
        const scoreData = await QuizAttempt.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, avgScore: { $avg: "$score" } } }
        ]);
        if (scoreData.length > 0) avgScore = Math.round(scoreData[0].avgScore);
    }

    res.json({
      user,
      stats: {
        totalQuizzes,
        avgScore,
        totalCalculations: carbonHistory.length
      },
      recentQuizzes: quizzesTaken,
      recentCarbon: carbonHistory
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    res.status(500).json({ message: 'Server Error fetching dashboard' });
  }
};

module.exports = { getDashboardData };