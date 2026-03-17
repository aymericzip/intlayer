import type { MessageKey } from '@intlayer/editor';
import { useEffect } from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

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

  return (data?: S) => manager.messenger.send(key, data);
};
