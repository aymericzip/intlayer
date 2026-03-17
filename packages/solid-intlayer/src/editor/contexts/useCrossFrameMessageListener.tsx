import type { MessageKey } from '@intlayer/editor';
import { onCleanup } from 'solid-js';
import { useEditorStateManager } from './EditorProvider';

export const useCrossFrameMessageListener = <S,>(
  key: `${MessageKey}` | `${MessageKey}/post` | `${MessageKey}/get`,
  onEventTriggered?: (data: S) => void
) => {
  const manager = useEditorStateManager();

  if (onEventTriggered) {
    const unsub = manager.messenger.subscribe(
      key,
      onEventTriggered as (data: unknown) => void
    );
    onCleanup(unsub);
  }

  return (data?: S) => manager.messenger.send(key, data);
};
