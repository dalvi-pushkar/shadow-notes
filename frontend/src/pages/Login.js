// src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const API_BASE = window?.env?.REACT_APP_API_URL || '';
const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await axios.post(`${API_BASE}/api/auth/login`, form);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setShake(true);
      setError('Invalid username/email or password.');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-500 relative bg-gradient-to-br from-background to-white dark:from-[#0a0a0a] dark:to-[#1a1a1a]">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full shadow bg-white/30 dark:bg-black/30 border border-white/20 backdrop-blur-md z-50"
      >
        {theme === 'dark' ? '🌙' : '🌞'}
      </button>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -6, 6, -2, 2, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-3xl bg-white/40 dark:bg-darkSurface backdrop-blur-xl border border-white/40 shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Shadow Notes</h1>
            <p className="text-muted dark:text-gray-400 mt-2">Your Thoughts, Safely Stored.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 text-red-700 text-sm p-2 px-4 mb-4 rounded-md border border-red-300"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username or Email */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Username or Email"
                className="peer w-full pl-12 pt-6 pb-2 rounded-xl bg-input text-black dark:text-white dark:bg-white/10 placeholder-transparent border border-white/40 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <label
                htmlFor="username"
                className="absolute left-12 text-sm text-gray-600 dark:text-gray-300 transition-all 
                  peer-placeholder-shown:top-4 
                  peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-500 
                  peer-focus:top-2 
                  peer-focus:text-sm"
              >
                Username or Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="peer w-full pl-12 pr-12 pt-6 pb-2 rounded-xl bg-input text-black dark:text-white dark:bg-white/10 placeholder-transparent border border-white/40 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <label
                htmlFor="password"
                className="absolute left-12 text-sm text-gray-600 dark:text-gray-300 transition-all 
                  peer-placeholder-shown:top-4 
                  peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-500 
                  peer-focus:top-2 
                  peer-focus:text-sm"
              >
                Password
              </label>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </motion.div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-400 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition"
            >
              Log In
            </motion.button>
          </form>

          {/* Register Redirect */}
          <p className="text-sm text-center mt-6 text-muted dark:text-gray-400">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
