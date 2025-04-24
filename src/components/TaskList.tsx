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