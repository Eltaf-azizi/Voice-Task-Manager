import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Task, TaskFilters, SortOption, Priority, Category } from '../types/Task';

const STORAGE_KEY = 'voicetask-items';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all'
  });