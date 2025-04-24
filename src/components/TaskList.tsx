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