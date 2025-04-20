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
