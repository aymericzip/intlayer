'use client';

import { useEffect, useState } from 'react';

const scrollToHash = (id: string) => {
  const element = document.getElementById(id);
  const offset = 150;
  const y =
    (element?.getBoundingClientRect()?.top ?? 0) + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

export const SectionScroller = () => {
  const [hash, setHash] = useState<string>();

  const onHashChange = () => {
    setHash(window.location.hash.slice(1));
  };

  useEffect(() => {
    setHash(window.location.hash.slice(1));

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (hash) {
      scrollToHash(hash);
    }
  }, [hash]);

  return null;
};
