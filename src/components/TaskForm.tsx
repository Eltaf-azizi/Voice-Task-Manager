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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <div className={`mb-8 p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {error && (
        <div className="mb-4 p-3 text-sm rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className={`w-full px-4 py-3 rounded-lg text-base ${
              darkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-200'
            } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
            aria-label="Task description"
          />
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Due Date
              </label>
              <div className="relative">
                <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-800 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category
              </label>
              <div className="relative">
                <Tag size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-800 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Priority
              </label>
              <div className="relative">
                <AlertCircle size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-800 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
                className={`w-full px-4 py-2 rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                    : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
                rows={3}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {hasRecognitionSupport && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? (
                <>
                  <MicOff size={18} />
                  <span className="hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Mic size={18} />
                  <span className="hidden sm:inline">Speak Task</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-2.5 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isExpanded ? 'Less Options' : 'More Options'}
          </button>
          
          <button
            type="submit"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 ${
              !inputValue.trim() ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={!inputValue.trim()}
            aria-label="Add task"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
};