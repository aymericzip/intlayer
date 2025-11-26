'use client';

import { useEffect } from 'react';

const registerServiceWorker = async () => {
  // Pre-check: verify the service worker file is accessible and has correct MIME type
  const response = await fetch('/sw.js', { method: 'HEAD' });
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    throw new Error(`Service worker file not found: ${response.status}`);
  }

  if (contentType && !contentType.includes('javascript')) {
    throw new Error(
      `Service worker has invalid MIME type: ${contentType}. Expected application/javascript.`
    );
  }

  return await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    type: 'classic',
    updateViaCache: 'none',
  });
};

export const useServiceWorker = () => {
  // const isServiceWorkerEnabled = process.env.NODE_ENV === 'production';

  useEffect(() => {
    // if (isServiceWorkerEnabled && 'serviceWorker' in navigator) {
    //   registerServiceWorker().catch((err) => {
    //     // Log the error but don't throw - SW is optional functionality
    //     console.warn('Service worker registration failed:', err.message);
    //   });
    // }
  }, []);
};
