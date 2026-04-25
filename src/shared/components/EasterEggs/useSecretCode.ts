import { useEffect, useRef } from 'react';

/**
 * A hook that listens for a secret code typed on the keyboard.
 * @param code The secret code to listen for (e.g., 'meteor')
 * @param callback Function to call when the code is matched
 */
export const useSecretCode = (code: string, callback: () => void) => {
  const buffer = useRef('');
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // We only care about single character keys
      if (e.key.length !== 1) return;

      const char = e.key.toLowerCase();
      buffer.current = (buffer.current + char).slice(-code.length);
      
      if (buffer.current === code.toLowerCase()) {
        callbackRef.current();
        buffer.current = ''; // Reset buffer after match
      }
    };

    window.addEventListener('keydown', handleKeyDown, true); // Use capture phase
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [code]);
};
