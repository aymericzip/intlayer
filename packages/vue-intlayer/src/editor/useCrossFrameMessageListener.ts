import type { MessageKey } from '@intlayer/editor';
import { inject, onScopeDispose } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useCrossFrameMessageListener = <S>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void
) => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  if (onEventTriggered && manager) {
    const unsub = manager.messenger.subscribe(
      key,
      onEventTriggered as (data: unknown) => void
    );
    onScopeDispose(unsub);
  }

  return (data?: S) => manager?.messenger.send(key, data);
};
