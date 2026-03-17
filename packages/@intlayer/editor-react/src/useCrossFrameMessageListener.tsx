'use client';

import type { MessageKey } from '@intlayer/editor';
import { useEffect } from 'react';
import { useEditorStateManager } from './EditorStateContext';

/**
 * Listens for cross-frame messages of the specified type and calls the callback.
 * Returns a function to manually send a message of the same type.
 *
 * Backed by CrossFrameMessenger from EditorStateManager.
 */
export const useCrossFrameMessageListener = <S,>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void,
  revalidator?: any
) => {
  const manager = useEditorStateManager();

  useEffect(() => {
    if (!onEventTriggered) return;
    return manager.messenger.subscribe<S>(key, onEventTriggered);
  }, [manager, key, revalidator]);

  return (data?: S) => {
    manager.messenger.send(key, data);
  };
};
