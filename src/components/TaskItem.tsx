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