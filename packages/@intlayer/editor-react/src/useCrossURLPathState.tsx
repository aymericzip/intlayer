'use client';

import { MessageKey } from '@intlayer/editor';
import { useCrossFrameState } from './useCrossFrameState';

/**
 * Returns the path currently displayed by the client application.
 */
export const useCrossURLPathState = (): string | undefined =>
  useCrossFrameState<string | undefined>(
    MessageKey.INTLAYER_URL_CHANGE,
    undefined
  );
