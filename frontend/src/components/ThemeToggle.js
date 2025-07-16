import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-400" size={20} />
      ) : (
        <FaMoon className="text-blue-600" size={20} />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
