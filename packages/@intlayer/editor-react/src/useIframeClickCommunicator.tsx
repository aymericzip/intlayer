'use client';

import { useEffect } from 'react';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export const useIframeClickInterceptor = () => {
  const postMessage = useCrossFrameMessageListener<undefined>(
    'INTLAYER_IFRAME_CLICKED'
  );

  useEffect(() => {
    const handlePostMessageEvent: EventListener = () => {
      postMessage(undefined);
    };

    window.addEventListener('mousedown', handlePostMessageEvent);

    return () =>
      window.removeEventListener('mousedown', handlePostMessageEvent);
  }, [postMessage]);
};

// Listener for messages from the iframe
const handleIframeMessage = (event: MessageEvent) => {
  // Simulate or merge the iframe message with a click event
  const simulatedMouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  const simulatedClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  // Optionally attach additional properties from the iframe message
  Object.assign(simulatedClickEvent, { iframeData: event });
  Object.assign(simulatedMouseDownEvent, { iframeData: event });

  // Dispatch the simulated click event on the window or a specific element
  window.dispatchEvent(simulatedClickEvent);
  window.dispatchEvent(simulatedMouseDownEvent);
};

export const useIframeClickMerger = () =>
  useCrossFrameMessageListener<MessageEvent>(
    'INTLAYER_IFRAME_CLICKED',
    handleIframeMessage
  );
