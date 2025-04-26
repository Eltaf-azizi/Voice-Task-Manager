export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'finance';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  dueDate?: string;
  priority: Priority;
  category: Category;
  notes?: string;
}

export interface TaskFilters {
  search: string;
  category: Category | 'all';
  priority: Priority | 'all';
  status: 'all' | 'completed' | 'active';
}

export type SortOption = 'dueDate' | 'priority' | 'createdAt' | 'alphabetical';