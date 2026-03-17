import { DestroyRef, inject } from '@angular/core';
import type { MessageKey } from '@intlayer/types/messageKey';
import { getEditorStateManager } from './installIntlayerEditor';

export const useCrossFrameMessageListener = <S>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void
) => {
  const manager = getEditorStateManager();

  if (onEventTriggered && manager) {
    const unsub = manager.messenger.subscribe(
      key,
      onEventTriggered as (data: unknown) => void
    );

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(unsub);
    } catch {}
  }

  return (data?: S) => manager?.messenger.send(key, data);
};
