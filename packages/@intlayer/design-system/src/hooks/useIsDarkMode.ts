'use client';

import { useState, useEffect } from 'react';

export const useIsDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    const isDarkMode = htmlElement?.getAttribute('data-theme') === 'dark';
    setIsDarkMode(isDarkMode);
  }, []);

  return isDarkMode;
};
