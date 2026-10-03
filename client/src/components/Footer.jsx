import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-eco-600 text-white pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-green-700 pb-8">
          
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌍</span>
              <h3 className="text-2xl font-bold">EcoSphere</h3>
            </div>
            <p className="text-green-100 text-sm leading-relaxed mb-4">
              An interactive web platform dedicated to raising awareness about sustainability, 
              calculating carbon footprints, and educating users about the SDGs.
            </p>
            <div className="flex gap-4">
              {/* Social Icons (Placeholders) */}
              <span className="text-2xl cursor-pointer hover:text-eco-accent transition-colors">🐦</span>
              <span className="text-2xl cursor-pointer hover:text-eco-accent transition-colors">📸</span>
              <span className="text-2xl cursor-pointer hover:text-eco-accent transition-colors">💼</span>
            </div>
          </div>

          {/* Column 2: Owner Details */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-eco-accent">Project Developer</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-300">👤</span>
                <span>Khushi Singh</span> {/* Change this to your name */}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">📧</span>
                <a href="mailto:aryan@example.com" className="hover:text-eco-accent transition-colors">
                   singhkhushi2270@gmail.com{/* Change this to your email */}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">📱</span>
                <span> +917317693476 </span> {/* Change this to your number */}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">🎓</span>
                <span>Student</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-eco-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="hover:text-eco-accent transition-colors">Explore SDGs</Link></li>
              <li><Link to="/learn" className="hover:text-eco-accent transition-colors">Read Articles</Link></li>
              <li><Link to="/calculator" className="hover:text-eco-accent transition-colors">Carbon Calculator</Link></li>
              <li><Link to="/quiz" className="hover:text-eco-accent transition-colors">Take a Quiz</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-green-200">
          <p>&copy; {new Date().getFullYear()} EcoSphere Project. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;