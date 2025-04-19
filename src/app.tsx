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

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Voice Task Manager
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Add tasks by typing or using your voice
              </p>
            </div>
            
            <TaskForm onAddTask={addTask} darkMode={darkMode} />
            
            <TaskFilters
              filters={filters}
              onFiltersChange={setFilters}
              darkMode={darkMode}
            />
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size={32} className="text-indigo-600" />
              </div>
            ) : (
              <TaskList 
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
                sortBy={sortBy}
                onSortChange={(sort: SortOption) => setSortBy(sort)}
                darkMode={darkMode}
              />
            )}
          </div>
        </main>
        
        <Footer darkMode={darkMode} />
      </div>
    </ErrorBoundary>
  );
}

export default App;