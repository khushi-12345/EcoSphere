import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      alert('Error registering user.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-10">
          <h2 className="text-3xl font-extrabold text-center text-eco-600 dark:text-eco-500 mb-2">Join EcoSphere</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Create your account to start tracking</p>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-eco-500 outline-none" />
            <input type="email" placeholder="Email Address" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-eco-500 outline-none" />
            <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-eco-500 outline-none" />
            <button type="submit" className="w-full bg-eco-600 hover:bg-eco-700 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-[1.02] shadow-md mt-4">
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already a member? <Link to="/login" className="text-eco-600 hover:underline font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;