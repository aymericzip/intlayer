'use client';

import { useEffect } from 'react';

const scrollToHash = (id: string) => {
  const element = document.getElementById(id);
  const offset = 150;
  const y =
    (element?.getBoundingClientRect()?.top ?? 0) + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

export const SectionScroller = () => {
  useEffect(() => {
    // Scroll on mount if hash exists
    const currentHash = window.location.hash.slice(1);
    if (currentHash) {
      scrollToHash(currentHash);
    }

    const onHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash) {
        scrollToHash(newHash);
      }
    };

    window.addEventListener('hashchange', onHashChange, { passive: true });
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
};
