import { MessageKey, mergeIframeClick } from '@intlayer/editor';
import { onDestroy, onMount } from 'svelte';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export const useIframeClickInterceptor = () => {
  const postMessage = useCrossFrameMessageListener<undefined>(
    MessageKey.INTLAYER_IFRAME_CLICKED
  );

  const handler = () => {
    postMessage();
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', handler);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousedown', handler);
    }
  });
};

export const useIframeClickMerger = () => {
  useIframeClickInterceptor();

  useCrossFrameMessageListener<MessageEvent>(
    MessageKey.INTLAYER_IFRAME_CLICKED,
    (data) => {
      // mergeIframeClick(data); // mergeIframeClick expects an event, but data might be stripped?
      // Actually mergeIframeClick logic in editor package probably dispatches a custom event or similar.
      // The Vue implementation passes `mergeIframeClick` directly as the callback.
      // Let's assume mergeIframeClick handles whatever data is passed, or we wrap it if needed.
      mergeIframeClick(data as any);
    }
  );
};
