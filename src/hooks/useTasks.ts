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

  // Save tasks to localStorage
  const saveTasks = (updatedTasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (err) {
      toast.error('Failed to save tasks');
      throw err;
    }
  };

  const addTask = async (
    text: string,
    priority: Priority = 'medium',
    category: Category = 'personal',
    dueDate?: string,
    notes?: string
  ) => {
    try {
      const newTask: Task = {
        id: crypto.randomUUID(),
        text,
        priority,
        category,
        dueDate,
        notes,
        completed: false,
        createdAt: Date.now()
      };

      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      toast.success('Task added successfully');
      return newTask;
    } catch (err) {
      toast.error('Failed to add task');
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
      throw err;
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTasks = tasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task marked as complete');
    } catch (err) {
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      throw err;
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(filters.search.toLowerCase()) ||
                            task.notes?.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'all' || task.category === filters.category;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
        const matchesStatus = filters.status === 'all' ||
                            (filters.status === 'completed' && task.completed) ||
                            (filters.status === 'active' && !task.completed);

        return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'dueDate':
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            case 'priority':
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            case 'alphabetical':
              return a.text.localeCompare(b.text);
              default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [tasks, filters, sortBy]);

  return {
    tasks: filteredAndSortedTasks,
    loading,
    error,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    filters,
    setFilters,
    sortBy,
    setSortBy
  };
}