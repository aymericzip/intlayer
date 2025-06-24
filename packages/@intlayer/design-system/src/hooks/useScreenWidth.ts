'use client';

import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
  const [screenWith, setScreenWith] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWith(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenWith };
};
