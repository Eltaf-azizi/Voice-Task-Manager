import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 ease-in-out ${
        scrolled 
          ? `${darkMode ? 'bg-gray-900/95 shadow-gray-900/20' : 'bg-white/95 shadow-gray-200/20'} shadow-lg backdrop-blur` 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
            VoiceTask
          </span>
        </div>
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full transition-colors ${
            darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};