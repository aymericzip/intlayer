import { DestroyRef, inject } from '@angular/core';
import { MessageKey, mergeIframeClick } from '@intlayer/editor';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

/* ─────────────────────────────────────────────
   1.  "Interceptor" – send a postMessage when
       the editor iframe itself is clicked.
────────────────────────────────────────────── */
/**
 * Hook that intercepts clicks in the iframe and sends them to the parent window
 * This allows the parent window to know when the iframe is clicked
 */
export const useIframeClickInterceptor = createSharedComposable(() => {
  const postMessage = useCrossFrameMessageListener<undefined>(
    MessageKey.INTLAYER_IFRAME_CLICKED
  );

  const handler = () => {
    postMessage();
  };

  // Use Angular's DestroyRef for cleanup instead of Vue's lifecycle hooks
  try {
    const destroyRef = inject(DestroyRef, { optional: true });

    if (destroyRef && typeof window !== 'undefined') {
      // Set up event listener immediately
      window.addEventListener('mousedown', handler);

      // Clean up on destroy
      destroyRef.onDestroy(() =>
        window.removeEventListener('mousedown', handler)
      );
    }
  } catch {
    console.warn(
      'useIframeClickInterceptor called outside injection context; ' +
        'event listener setup may not be available.'
    );
  }
});

/**
 * Hook for the parent window to listen for iframe clicks and merge them
 * This makes iframe clicks behave as if they happened in the parent window
 */
export const useIframeClickMerger = createSharedComposable(() => {
  useIframeClickInterceptor();

  useCrossFrameMessageListener<MessageEvent>(
    MessageKey.INTLAYER_IFRAME_CLICKED,
    mergeIframeClick
  );
});
