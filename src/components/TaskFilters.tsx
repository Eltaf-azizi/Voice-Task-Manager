import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TaskFilters, Category, Priority } from '../types/Task';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  darkMode: boolean;
}

export const TaskFilterComponent: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  darkMode
}) => {
  const categories: Category[] = ['personal', 'work', 'shopping', 'health', 'finance'];
  const priorities: Priority[] = ['low', 'medium', 'high'];
  const statuses = ['all', 'active', 'completed'];

  
  return (
    <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search 
            size={18} 
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} 
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Search tasks..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
              darkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-200'
            } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
          />
        </div>


        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                category: e.target.value as Category | 'all' 
              })}
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-gray-50 text-gray-800 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>


          <div className="flex-1 min-w-[150px]">
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                priority: e.target.value as Priority | 'all' 
              })}
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-gray-50 text-gray-800 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
            >
              <option value="all">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                status: e.target.value as 'all' | 'completed' | 'active' 
              })}
              className={`w-full px-3 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-gray-50 text-gray-800 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};