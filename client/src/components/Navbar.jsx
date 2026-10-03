import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'SDGs', path: '/explore' },
    { name: 'Learn', path: '/learn' },
    { name: 'Tools', path: '/calculator' },
    { name: 'Quiz', path: '/quiz' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b backdrop-blur-md ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md py-3' : 'bg-white/80 dark:bg-gray-900/80 py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-500">🌍</span>
            <span className={`font-extrabold text-xl tracking-wide ${scrolled || theme === 'dark' ? 'text-white' : 'text-eco-600'}`}>
              EcoSphere
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    location.pathname === link.path
                      ? 'text-eco-500 dark:text-eco-400 font-bold'
                      : scrolled || theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-eco-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {user ? (
              // Logged In
              <div className="flex items-center gap-3">
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="text-sm font-semibold hover:text-eco-600 dark:hover:text-white transition-colors"
                >
                  {user.role === 'admin' ? 'Admin' : 'Dashboard'}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Logged Out
              <Link to="/login" className="bg-eco-500 text-white px-5 py-2 rounded-full font-bold hover:bg-eco-700 transition-transform hover:scale-105 shadow-lg">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 absolute w-full shadow-xl animate-fade-in border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2 flex items-center justify-between px-3">
               <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                  {user ? `Hi, ${user.name}` : 'Guest'}
               </span>
               <button onClick={toggleTheme} className="p-1">
                  {theme === 'dark' ? '☀️' : '🌙'}
               </button>
            </div>

            {user ? (
               <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }} 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
               >
                  Logout
               </button>
            ) : (
               <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-bold bg-eco-500 text-white"
               >
                  Login
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;