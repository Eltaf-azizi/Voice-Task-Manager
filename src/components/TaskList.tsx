import React from 'react';
import { TaskItem } from './TaskItem';
import { Task, SortOption } from '../types/Task';
import { ClipboardList, ArrowUpDown } from 'lucide-react';


interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  darkMode: boolean;
}


export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  sortBy,
  onSortChange,
  darkMode
}) => {
  if (tasks.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-4 rounded-lg ${
        darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
      }`}>
        <ClipboardList size={64} className="opacity-30 mb-4" />
        <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
        <p className="text-center text-sm max-w-md">
          Add your first task by typing in the input field above or using voice input.
        </p>
      </div>
    );
  }

  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${
          darkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Tasks ({tasks.length})
        </h2>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className={`text-sm px-2 py-1 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-gray-50 text-gray-800 border-gray-200'
            } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
          >

            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};