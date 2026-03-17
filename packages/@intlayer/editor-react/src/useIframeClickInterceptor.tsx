'use client';

import { mergeIframeClick } from '@intlayer/editor';
import { MessageKey } from '@intlayer/types/messageKey';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

/**
 * Broadcasts mousedown events from within an iframe to the parent frame.
 * Called in the client application (inside the iframe).
 * Note: EditorStateManager.start() already sets this up in client mode.
 * This hook exists for explicit / standalone use cases.
 */
export const useIframeClickInterceptor = () => {
  useCrossFrameMessageListener<undefined>(MessageKey.INTLAYER_IFRAME_CLICKED);
};

/**
 * Merges received iframe click events into the parent's DOM event stream.
 * Called in the editor (parent frame).
 */
export const useIframeClickMerger = () => {
  useCrossFrameMessageListener<MessageEvent>(
    MessageKey.INTLAYER_IFRAME_CLICKED,
    mergeIframeClick
  );
};
