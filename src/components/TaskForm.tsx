import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Priority, Category } from '../types/Task';

interface TaskFormProps {
  onAddTask: (text: string, priority: Priority, category: Category, dueDate?: string, notes?: string) => void;
  darkMode: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, darkMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    text: speechText, 
    isListening, 
    startListening, 
    stopListening, 
    hasRecognitionSupport,
    error 
  }  = useSpeechRecognition();
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (speechText) {
      setInputValue(speechText);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [speechText]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue, priority, category, dueDate || undefined, notes || undefined);
      setInputValue('');
      setPriority('medium');
      setCategory('personal');
      setDueDate('');
      setNotes('');
      setIsExpanded(false);
    }
  };