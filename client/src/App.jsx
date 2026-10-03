import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SDGExplorer from './pages/SDGExplorer';
import SDGDetails from './pages/SDGDetails';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import CarbonCalculator from './pages/CarbonCalculator';
import QuizList from './pages/QuizList';
import QuizAttempt from './pages/QuizAttempt';
import QuizResult from './pages/QuizResult';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // Global interactive theme hook
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Router>
          <ScrollToTop />
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<SDGExplorer />} />
            <Route path="/sdg/:id" element={<SDGDetails />} />
            <Route path="/learn" element={<Articles />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/calculator" element={<CarbonCalculator />} />
            <Route path="/quiz" element={<QuizList />} />
            <Route path="/quiz/:id" element={<QuizAttempt />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;