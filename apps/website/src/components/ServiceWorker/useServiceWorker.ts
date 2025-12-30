'use client';

import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // 1. IN DEVELOPMENT: Aggressively unregister any existing Service Workers
    // This solves the issue of caching being applied in dev.
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          console.log('🚧 Unregistering Dev Service Worker:', registration);
          registration.unregister();
        }
      });
      return;
    }

    // 2. IN PRODUCTION: Register the Service Worker
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          '✅ Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((err) => {
        console.error('❌ Service Worker registration failed:', err);
      });
  }, []);
};
