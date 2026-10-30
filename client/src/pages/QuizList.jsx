import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/quizzes`).then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-eco-600 dark:text-eco-500 mb-10">Sustainability Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-yellow-400 hover:transform hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{quiz.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{quiz.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">⏱️ {Math.floor(quiz.duration / 60)} mins</span>
                <Link to={`/quiz/${quiz._id}`} className="bg-eco-600 text-white px-6 py-2 rounded-full font-bold hover:bg-eco-700 shadow-md">Start Quiz</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;