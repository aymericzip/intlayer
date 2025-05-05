'use client';

import { MessageKey, mergeIframeClick } from '@intlayer/editor';
import { useEffect } from 'react';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export const useIframeClickInterceptor = () => {
  const postMessage = useCrossFrameMessageListener<undefined>(
    `${MessageKey.INTLAYER_IFRAME_CLICKED}/post`
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

export const useIframeClickMerger = () =>
  useCrossFrameMessageListener<MessageEvent>(
    `${MessageKey.INTLAYER_IFRAME_CLICKED}/get`,
    mergeIframeClick
  );
