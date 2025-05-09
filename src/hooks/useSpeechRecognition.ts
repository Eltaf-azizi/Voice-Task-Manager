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


    recognition.onerror = (event: any) => {
      setError(`Error occurred in recognition: ${event.error}`);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [hasRecognitionSupport]);

  
  const startListening = useCallback(() => {
    setText('');
    setError(null);
    
    if (!hasRecognitionSupport) {
      setError('Your browser does not support speech recognition');
      return;
    }
    
    setIsListening(true);
    
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    

    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  }, [hasRecognitionSupport]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    error
  };
}

// Declare global type for window
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}