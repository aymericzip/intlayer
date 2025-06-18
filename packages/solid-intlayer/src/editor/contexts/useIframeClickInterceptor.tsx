'use client';

import { MessageKey, mergeIframeClick } from '@intlayer/editor';
import { onCleanup, onMount } from 'solid-js';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

/**
 * Custom hook that intercepts clicks on the page and sends them via `postMessage`.
 *
 * This is useful in iframe contexts where you want the parent frame to know
 * about click events happening within the iframe.
 */
export const useIframeClickInterceptor = () => {
  const postClickEvent = useCrossFrameMessageListener<undefined>(
    MessageKey.INTLAYER_IFRAME_CLICKED
  );

  onMount(() => {
    const handleClick = (event: MouseEvent) => {
      // Send click event to the parent frame
      postClickEvent();
    };

    // Add click event listener to the document
    document.addEventListener('mousedown', handleClick);

    // Cleanup function to remove the event listener
    onCleanup(() => {
      document.removeEventListener('mousedown', handleClick);
    });
  });
};

export const useIframeClickMerger = () =>
  useCrossFrameMessageListener<MessageEvent>(
    MessageKey.INTLAYER_IFRAME_CLICKED,
    mergeIframeClick
  );
