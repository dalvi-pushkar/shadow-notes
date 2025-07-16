/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode control
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Scan only source files for Tailwind classes
  theme: {
    extend: {
      colors: {
        background: '#f5f7fa',                     // Light background
        darkBg: '#0e0f11',                         // Deep dark base
        darkSurface: 'rgba(255,255,255,0.04)',     // Glassmorphic surface (dark mode)
        card: 'rgba(255, 255, 255, 0.5)',           // Light cards
        input: 'rgba(255, 255, 255, 0.6)',          // Input fields (light)
        primary: '#00bcd4',                         // Accent (cyan)
        muted: '#888888',                           // Secondary text
        white: '#ffffff',
        black: '#000000',
      },
      borderRadius: {
        xl: '1.5rem',
        '2xl': '2rem',
      },
      backdropBlur: {
        xl: '40px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.1)',            // For cards
        glow: '0 0 15px rgba(0, 188, 212, 0.4)',           // Primary accent glow
        inset: 'inset 0 2px 6px rgba(255, 255, 255, 0.2)', // Subtle inner shine
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Extra utility classes like fade, slide, zoom
  ],
};
