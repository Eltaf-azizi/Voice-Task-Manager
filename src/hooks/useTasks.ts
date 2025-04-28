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

  const [sortBy, setSortBy] = useState<SortOption>('createdAt');

  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from localStorage
  const loadTasks = () => {
    try {
      setLoading(true);
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };