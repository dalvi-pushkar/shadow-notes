import React, { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  useEffect(() => {
    const root = document.documentElement;

    // Smooth transition class added
    root.classList.add('theme-transition');
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Remove class after animation (optional, for repeat triggers)
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 500); // Matches transition time

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
