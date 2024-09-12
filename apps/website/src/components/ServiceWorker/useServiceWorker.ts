'use client';

import { useEffect } from 'react';

const registerServiceWorker = async () =>
  await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    type: 'classic',
    updateViaCache: 'none',
  });

export const useServiceWorker = () => {
  const isServiceWorkerEnabled = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (isServiceWorkerEnabled && 'serviceWorker' in navigator) {
      registerServiceWorker().catch((err) => console.error(err));
    }
  }, []);
};
