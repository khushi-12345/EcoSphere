import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) return <div className="p-10 text-center">No result found. <Link to="/quiz" className="text-eco-600 underline">Go back</Link></div>;

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center">
        <div className="mb-6 text-6xl">
          {result.score >= 80 ? '🎉' : result.score >= 50 ? '👍' : '📚'}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quiz Completed!</h2>
        <p className="text-gray-500 mb-8">You scored</p>
        
        <div className="text-6xl font-extrabold text-eco-600 mb-2">
          {result.score}%
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {result.correctCount} out of {result.totalQuestions} correct
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm text-gray-500 uppercase">Accuracy</div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">{Math.round((result.correctCount/result.totalQuestions)*100)}%</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm text-gray-500 uppercase">Status</div>
            <div className={`text-xl font-bold ${result.score >= 50 ? 'text-green-500' : 'text-red-500'}`}>{result.score >= 50 ? 'Passed' : 'Failed'}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-full py-3 bg-eco-600 text-white rounded-xl font-bold hover:bg-eco-700 transition-colors">Go to Dashboard</button>
          <Link to="/quiz" className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center">Try Another Quiz</Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;