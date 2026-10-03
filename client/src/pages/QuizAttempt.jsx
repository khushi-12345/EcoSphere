import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  
  const [quiz, setQuiz] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!user) return navigate('/login');
    const fetchQuiz = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`, config);
      setQuiz(data);
      setTimeLeft(data.duration);
    };
    fetchQuiz();
  }, [id, user, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && quiz) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft, quiz]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions({ ...selectedOptions, [currentQIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    const answersArray = quiz.questions.map((_, idx) => selectedOptions[idx] !== undefined ? selectedOptions[idx] : -1);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/quizzes/submit', 
        { quizId: id, answers: answersArray, timeTaken: quiz.duration - timeLeft }, 
        config
      );
      navigate('/quiz-result', { state: { result: data } });
    } catch (error) { console.error(error); }
  };

  if (!quiz) return <div className="h-screen flex items-center justify-center text-xl">Loading Quiz...</div>;
  const currentQuestion = quiz.questions[currentQIndex];

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Timer Header */}
        <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <span className="font-bold text-gray-700 dark:text-gray-200">Question {currentQIndex + 1}/{quiz.questions.length}</span>
          <span className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-eco-600'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-eco-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQIndex + 1) / quiz.questions.length) * 100}%` }}></div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{currentQuestion.questionText}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOptions[currentQIndex] === idx 
                    ? 'border-eco-500 bg-eco-50 dark:bg-eco-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-eco-300'
                }`}
              >
                <span className="font-bold mr-3 text-gray-400">{idx + 1}.</span> {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button 
            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))} 
            disabled={currentQIndex === 0}
            className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold disabled:opacity-50"
          >
            Previous
          </button>
          {currentQIndex === quiz.questions.length - 1 ? (
            <button onClick={handleSubmit} className="px-6 py-3 rounded-lg bg-eco-600 text-white font-bold hover:bg-eco-700 shadow-lg">Submit Quiz</button>
          ) : (
            <button onClick={() => setCurrentQIndex(currentQIndex + 1)} className="px-6 py-3 rounded-lg bg-eco-600 text-white font-bold hover:bg-eco-700 shadow-lg">Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;