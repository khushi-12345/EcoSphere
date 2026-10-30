import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate(); 
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect immediately
      return;
    }
    const fetchDashboard = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, config);
        setData(data);
      } catch (error) {
        console.error("Dashboard fetch error", error);
      }
    };
    fetchDashboard();
  }, [user]);

  if (!user) return <div className="p-10 text-center">Please Login</div>;
  if (!data) return <div className="p-10 text-center animate-pulse">Loading your stats...</div>;
  if (!user) return null;
  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-eco-500 to-eco-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 transform translate-x-20"></div>
          <h1 className="text-4xl font-bold mb-2">Hello, {data.user.name}! 👋</h1>
          <p className="text-eco-100 text-lg opacity-90">Your sustainability journey is just beginning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Quizzes Taken" value={data.stats.totalQuizzes} icon="📝" color="bg-blue-500" />
          <StatCard title="Avg Score" value={`${data.stats.avgScore}%`} icon="🏆" color="bg-yellow-500" />
          <StatCard title="Calculations" value={data.stats.totalCalculations} icon="🌱" color="bg-green-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recent Quizzes</h3>
            {data.recentQuizzes.length > 0 ? (
              <ul className="space-y-3">
                {data.recentQuizzes.map((q) => (
                  <li key={q._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-200">{q.quiz.title}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${q.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{q.score}%</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 italic">No quizzes yet.</p>}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Carbon History</h3>
            {data.recentCarbon.length > 0 ? (
              <ul className="space-y-3">
                {data.recentCarbon.map((c) => (
                  <li key={c._id} className="p-3 border-l-4 border-eco-500 bg-gray-50 dark:bg-gray-700 rounded-r-lg">
                    <span className="font-bold text-gray-800 dark:text-white">{c.totalFootprint} tons</span>
                    <span className="block text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 italic">No calculations saved.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-5">
    <div className={`p-4 rounded-full text-3xl ${color} text-white shadow-inner`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase">{title}</p>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

export default Dashboard;