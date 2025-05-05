'use client';

import { useEffect, useState } from 'react';

export const useKeyboardDetector = () => {
  const [windowHeight, setWindowHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      const isKeyboardOpen = Boolean(
        window.visualViewport?.height &&
          window.visualViewport.height < window.innerHeight - 100
      );

      if (isKeyboardOpen && window.visualViewport) {
        setWindowHeight(window.visualViewport.height);
      } else {
        setWindowHeight(null);
      }
    };

    // Listen for changes in visualViewport height
    window.visualViewport?.addEventListener('resize', updateHeight, {
      passive: true,
    });
    updateHeight(); // Set initial height

    return () => {
      window.visualViewport?.removeEventListener('resize', updateHeight);
    };
  }, []);

  return { windowHeight, isKeyboardOpen: windowHeight !== null };
};
