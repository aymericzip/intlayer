'use client';

import { useEffect } from 'react';

const isActive = true || process.env.NODE_ENV === 'production';

/**
 * Hook to register the Serwist service worker.
 * Zero-rerender: purely side-effect based, no state tracking.
 *
 * When an update is available, the SW automatically activates on next page load.
 * For manual update UI, track state in your component instead.
 */
export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && isActive) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('SW Registered'))
        .catch((err) => console.error('SW Failed', err));
    }
  }, []);
};
