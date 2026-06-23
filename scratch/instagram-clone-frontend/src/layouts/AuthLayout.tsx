import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Camera, Sun, Moon } from 'lucide-react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-black p-4 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        title="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="w-full max-w-[350px] flex flex-col items-center">
        {/* Main Card Container */}
        <div className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-8 shadow-sm flex flex-col items-center transition-all duration-300">
          
          {/* Logo Header */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="instagram-gradient p-2 rounded-xl text-white">
              <Camera size={28} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Instagram
            </span>
          </div>

          <div className="w-full">
            {children}
          </div>
        </div>

        {/* Bottom Small Screen helper text */}
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Instagram Clone from Antigravity
        </div>
      </div>
    </div>
  );
};
