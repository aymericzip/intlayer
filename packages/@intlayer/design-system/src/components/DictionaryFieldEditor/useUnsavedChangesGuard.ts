'use client';

import { useEffect } from 'react';

/**
 * Asks the browser to confirm before unloading the page while there are
 * unsaved changes. In-app router navigation is not intercepted: the design
 * system is router-agnostic, so apps guard their own routes.
 */
export const useUnsavedChangesGuard = (hasUnsavedChanges: boolean): void => {
  useEffect(() => {
    if (!hasUnsavedChanges || typeof window === 'undefined') return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Legacy browsers only show the prompt when returnValue is set
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
};
