import { useEffect } from 'react';

/**
 * Minimum delay between two update checks. Client-side navigations never
 * re-request `/sw.js`, so a long-lived tab would otherwise keep the previous
 * deploy's worker (and its precache) until a hard reload.
 */
const UPDATE_CHECK_INTERVAL_MS = 60_000;

export const useServiceWorker = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Aggressively unregister any existing Service Workers
    // This solves the issue of caching being applied in dev.
    if (import.meta.env.VITE_ENABLE_SERVICE_WORKER !== 'true') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          console.log('🚧 Unregistering Dev Service Worker:', registration);
          registration.unregister();
        }
      });
      return;
    }

    let serviceWorkerRegistration: ServiceWorkerRegistration | undefined;
    let lastUpdateCheckTimestamp = Date.now();

    /**
     * Asks the browser to re-fetch `/sw.js`. A changed worker installs, skips
     * waiting and drops the outdated precache (see `scripts/generate-sw.ts`).
     */
    const checkForUpdate = () => {
      if (!serviceWorkerRegistration) return;
      // Background tabs recheck when they become visible again.
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastUpdateCheckTimestamp < UPDATE_CHECK_INTERVAL_MS) {
        return;
      }

      lastUpdateCheckTimestamp = Date.now();
      serviceWorkerRegistration.update().catch(() => {
        // Offline or transient network failure — the next check retries.
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    };

    const updateCheckInterval = window.setInterval(
      checkForUpdate,
      UPDATE_CHECK_INTERVAL_MS
    );
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Register the Service Worker
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((registration) => {
        serviceWorkerRegistration = registration;
        console.log(
          '✅ Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((err) => {
        console.error('❌ Service Worker registration failed:', err);
      });

    return () => {
      window.clearInterval(updateCheckInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
