import { MessageKey } from '@intlayer/editor';
import { useEffect, useState } from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

export type EditorEnabledStateProps = {
  enabled: boolean;
};

export const useEditorEnabled = (): EditorEnabledStateProps => {
  const manager = useEditorStateManager();
  const [enabled, setEnabled] = useState<boolean>(
    manager.editorEnabled.value ?? false
  );

  useEffect(() => {
    const handler = (e: Event) =>
      setEnabled((e as CustomEvent<boolean>).detail);
    manager.editorEnabled.addEventListener('change', handler);
    return () => manager.editorEnabled.removeEventListener('change', handler);
  }, [manager]);

  return { enabled };
};

export const useEditorEnabledState = () => {
  const { enabled } = useEditorEnabled();
  const manager = useEditorStateManager();
  return [
    enabled,
    (value: boolean) => manager.editorEnabled.set(value),
  ] as const;
};

export const useGetEditorEnabledState = () => {
  const manager = useEditorStateManager();
  return () => {
    manager.messenger.send(`${MessageKey.INTLAYER_EDITOR_ENABLED}/get`);
  };
};

export const usePostEditorEnabledState = () => {
  const manager = useEditorStateManager();
  return () => manager.editorEnabled.postCurrentValue();
};
