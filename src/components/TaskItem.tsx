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
          
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-sm flex items-center gap-1 ${priorityColors[task.priority]}`}>
              <AlertCircle size={14} />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            <span className={`text-sm flex items-center gap-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Tag size={14} />
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
            }`}
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {isExpanded && task.notes && (
        <div className={`px-4 pb-4 pt-0 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm whitespace-pre-wrap">{task.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};