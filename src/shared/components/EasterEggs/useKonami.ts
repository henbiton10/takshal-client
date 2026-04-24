import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export const useKonami = (callback: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      
      // Keep only the last N keys where N is the length of the Konami code
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      
      setInput(newInput);

      // Check if the input matches the Konami code
      if (newInput.length === KONAMI_CODE.length && 
          newInput.every((key, index) => key.toLowerCase() === KONAMI_CODE[index].toLowerCase())) {
        callback();
        setInput([]); // Reset after successful entry
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, callback]);
};
