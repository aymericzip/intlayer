import { MessageKey, mergeIframeClick } from '@intlayer/editor';
import { getCurrentInstance, onBeforeUnmount, onMounted } from 'vue';
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
  const instance = getCurrentInstance();

  const handler = () => {
    postMessage();
  };

  // Only set up if in a component context
  if (instance) {
    onMounted(() => window.addEventListener('mousedown', handler));
    onBeforeUnmount(() => window.removeEventListener('mousedown', handler));
  } else {
    console.warn(
      'useIframeClickInterceptor must be called within a component setup function'
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
    `${MessageKey.INTLAYER_IFRAME_CLICKED}/get`,
    mergeIframeClick
  );
});
