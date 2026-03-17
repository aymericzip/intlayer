import type { MessageKey } from '@intlayer/types/messageKey';
import { onDestroy } from 'svelte';
import { getEditorStateManager } from './communicator';

export const useCrossFrameMessageListener = <S>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void,
  autoCleanup = true
) => {
  const manager = getEditorStateManager();

  if (onEventTriggered) {
    const unsub = manager?.messenger.subscribe(
      key,
      onEventTriggered as (data: unknown) => void
    );
    if (autoCleanup) {
      try {
        onDestroy(unsub);
      } catch {
        // Outside component context
      }
    }
  }

  return (data?: S) => manager?.messenger.send(key, data);
};
