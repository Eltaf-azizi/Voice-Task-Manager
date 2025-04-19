import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilterComponent as TaskFilters } from './components/TaskFilters';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTasks } from './hooks/useTasks';
import { SortOption } from './types/Task';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { 
    tasks, 
    loading,
    error,
    addTask, 
    updateTask,
    toggleTask, 
    deleteTask,
    filters,
    setFilters,
    sortBy,
    setSortBy
  } = useTasks();
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  if (error) {
    throw error;
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}>
        <Toaster position="top-right" />
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <Footer darkMode={darkMode} />
      </div>
    </ErrorBoundary>
  );
}

export default App;