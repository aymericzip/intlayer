'use client';

import { useEffect } from 'react';

export const useChunkErrorListener = () => {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      // Check if the error is a ChunkLoadError
      if (
        event?.message?.includes('ChunkLoadError') ||
        event?.message?.includes('Loading chunk')
      ) {
        console.warn('Chunk load error detected. Reloading page...');
        // Force a hard reload from the server to get the new HTML file
        window.location.reload();
      }
    };

    window.addEventListener('error', handler);

    // Also catch unhandled promise rejections (common for dynamic imports)
    const promiseHandler = (event: PromiseRejectionEvent) => {
      if (
        event?.reason?.message?.includes('ChunkLoadError') ||
        event?.reason?.message?.includes('Loading chunk')
      ) {
        console.warn('Chunk load promise error detected. Reloading page...');
        window.location.reload();
      }
    };

    window.addEventListener('unhandledrejection', promiseHandler);

    return () => {
      window.removeEventListener('error', handler);
      window.removeEventListener('unhandledrejection', promiseHandler);
    };
  }, []);
};
