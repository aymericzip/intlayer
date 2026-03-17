'use client';

import { MessageKey } from '@intlayer/types/messageKey';
import {
  type CrossFrameStateOptions,
  useCrossFrameState,
} from './useCrossFrameState';

export const useCrossURLPathState = (
  initialState?: string,
  options?: CrossFrameStateOptions
) => useCrossFrameState(MessageKey.INTLAYER_URL_CHANGE, initialState, options);

export const useCrossURLPathSetter = (initialState?: string) => {
  // The EditorStateManager already handles URL tracking in client mode via
  // UrlStateManager.start(). This hook remains for explicit use cases.
  return useCrossURLPathState(initialState, { emit: true, receive: false });
};
