import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-500 via-green-600 to-teal-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg animate-fade-in">
            Small Actions. <br /> <span className="text-eco-accent">Sustainable Future.</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-50 mb-10 max-w-2xl mx-auto">
            Join EcoSphere to learn about the environment, calculate your impact, and take action for a greener planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore" className="bg-white text-eco-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl">
              Explore SDGs 🌱
            </Link>
            <Link to="/calculator" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all">
              Calculate Footprint 🌍
            </Link>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute top-20 left-10 text-6xl animate-bounce-slow opacity-50">🌿</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-bounce-slow opacity-50" style={{animationDelay: '1s'}}>💧</div>
        <div className="absolute top-1/3 right-20 text-6xl animate-bounce-slow opacity-50" style={{animationDelay: '2s'}}>⚡</div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">Why EcoSphere?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard icon="📚" title="Learn" desc="Access hundreds of articles on sustainability, climate change, and green living." />
            <FeatureCard icon="🧮" title="Calculate" desc="Use our advanced tools to estimate your carbon footprint and get personalized tips." />
            <FeatureCard icon="🏆" title="Compete" desc="Take quizzes, track your progress, and climb the eco-leaderboard." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-eco-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-eco-600 dark:text-green-400 mb-6">Ready to make a change?</h2>
          <Link to="/register" className="inline-block bg-eco-600 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-eco-700 transition-transform hover:scale-105 shadow-lg">
            Join the Community
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100 dark:border-gray-700">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);

export default Home;