import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionReturn {
  text: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  error: string | null;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if browser supports speech recognition
  const hasRecognitionSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  let recognition: any = null;
  
  // Initialize speech recognition
  useEffect(() => {
    if (!hasRecognitionSupport) return;
    
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };