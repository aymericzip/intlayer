import { DestroyRef, inject } from '@angular/core';
import { MessageKey } from '@intlayer/editor';
import { useCrossFrameState } from './useCrossFrameState';

/**
 * Hook to create and manage a cross-frame synchronized URL path state
 * @param initial - The initial URL path
 * @param opts - Options for controlling emit and receive behavior
 * @returns A tuple containing [state signal, setState function, forceSync function]
 */
export const useCrossURLPathState = (
  initial?: string,
  opts?: Parameters<typeof useCrossFrameState>[2]
) => useCrossFrameState<string>(MessageKey.INTLAYER_URL_CHANGE, initial, opts);

/**
 * Hook for host applications to push URL path changes into the shared state
 * This also monkey patches history methods to capture navigation events
 * @param initial - The initial URL path
 * @returns A tuple containing [state signal, setState function]
 */
export const useCrossURLPathSetter = (initial?: string) => {
  const [state, setState] = useCrossURLPathState(initial, {
    emit: true,
    receive: false,
  });

  // Original history methods
  let originalPushState: typeof history.pushState;
  let originalReplaceState: typeof history.replaceState;

  // Function to update state with current pathname
  const update = () => setState(window.location.pathname);

  // Use Angular's DestroyRef for cleanup instead of Vue lifecycle hooks
  try {
    const destroyRef = inject(DestroyRef, { optional: true });

    if (destroyRef && typeof window !== 'undefined') {
      // Save original methods
      originalPushState = history.pushState;
      originalReplaceState = history.replaceState;

      /**
       * Wraps a history function to dispatch a custom event when called
       * @param fn - The history function to wrap
       * @returns The wrapped function
       */
      const wrap =
        (fn: typeof history.pushState) =>
        (...args: Parameters<typeof history.pushState>) => {
          fn.apply(history, args);
          window.dispatchEvent(new Event('locationchange'));
        };

      // Patch history methods
      history.pushState = wrap(originalPushState);
      history.replaceState = wrap(originalReplaceState);

      // Add event listeners
      window.addEventListener('locationchange', update);
      window.addEventListener('popstate', update);
      window.addEventListener('hashchange', update);

      // Initialize immediately
      update();

      // Clean up on destroy
      destroyRef.onDestroy(() => {
        window.removeEventListener('locationchange', update);
        window.removeEventListener('popstate', update);
        window.removeEventListener('hashchange', update);

        // Restore original history methods
        if (originalPushState) history.pushState = originalPushState;
        if (originalReplaceState) history.replaceState = originalReplaceState;
      });
    }
  } catch {
    console.warn(
      'useCrossURLPathSetter called outside injection context; ' +
        'URL path synchronization may not be available.'
    );
  }

  return [state, setState] as const;
};
