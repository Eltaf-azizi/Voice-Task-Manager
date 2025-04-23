import React, { useState } from 'react';
import { Check, Trash2, Calendar, Tag, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  darkMode: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle, 
  onDelete,
  onUpdate,
  darkMode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`group mb-3 rounded-lg transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-750' 
          : 'bg-white hover:bg-gray-50'
      } shadow-sm hover:shadow`}
    >
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
            task.completed 
              ? 'bg-indigo-600 border-indigo-600 text-white' 
              : `border-gray-300 ${darkMode ? 'hover:border-indigo-400' : 'hover:border-indigo-500'}`
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span 
              className={`${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-all duration-300`}
            >
              {task.text}
            </span>
            
            {task.dueDate && (
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                · Due {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          