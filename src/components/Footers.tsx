import React from 'react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-6 mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center text-sm">
          <p className="mt-1 text-xs opacity-70">
            Your tasks are saved in your browser's local storage
          </p>
        </div>
      </div>
    </footer>
  );
};