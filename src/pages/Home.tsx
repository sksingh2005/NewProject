import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-8xl font-bold tracking-tight animate-fade-in text-black dark:text-white">
        Welcome Home
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md text-center animate-slide-in">
        This is your beautifully themed Tailwind + React app. Click the button below to toggle dark mode.
      </p>

        <button
            onClick={toggleTheme}
            className="relative inline-flex items-center w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-200 "
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {/* Toggle circle */}
            <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md  flex items-center justify-center ${
              theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
            }`}>
              {theme === 'light' ? (
                <Sun size={14} className="text-yellow-500" />
              ) : (
                <Moon size={14} className="text-gray-600" />
              )}
            </div>
            
            {/* Background icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <Sun size={14} className={`text-yellow-500 transition-opacity duration-200 ${
                theme === 'light' ? 'opacity-0' : 'opacity-100'
              }`} />
              <Moon size={14} className={`text-gray-400 transition-opacity duration-200 ${
                theme === 'dark' ? 'opacity-0' : 'opacity-100'
              }`} />
            </div>
        </button>
    </div>
  );
}

export default Home;
