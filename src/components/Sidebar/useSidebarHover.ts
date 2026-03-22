import { useState, useCallback } from 'react';

export function useSidebarHover() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinned || isHovered;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const togglePin = useCallback(() => {
    setIsPinned((prev) => !prev);
  }, []);

  return {
    isExpanded,
    isPinned,
    handleMouseEnter,
    handleMouseLeave,
    togglePin,
  } as const;
}
