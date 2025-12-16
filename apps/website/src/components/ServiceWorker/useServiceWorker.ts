'use client';

import { Serwist } from '@serwist/window';
import { useEffect, useRef } from 'react';

/**
 * Hook to register the Serwist service worker.
 * Zero-rerender: purely side-effect based, no state tracking.
 *
 * When an update is available, the SW automatically activates on next page load.
 * For manual update UI, track state in your component instead.
 */
export const useServiceWorker = () => {
  const serwistRef = useRef<Serwist | undefined>(undefined);
  const hasRegisteredRef = useRef(false);

  useEffect(() => {
    // Only register once
    if (hasRegisteredRef.current) return;

    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const sw = new Serwist('/sw.js', { scope: '/' });

      // Optional: Log when an update is available
      const handleWaiting = () => {
        console.log(
          '[ServiceWorker] Update available. Will activate on next page load.'
        );
      };

      sw.addEventListener('waiting', handleWaiting);

      // Register the service worker
      sw.register();
      serwistRef.current = sw;
      hasRegisteredRef.current = true;

      // Cleanup event listener on unmount
      return () => {
        sw.removeEventListener('waiting', handleWaiting);
      };
    }
  }, []);
};
