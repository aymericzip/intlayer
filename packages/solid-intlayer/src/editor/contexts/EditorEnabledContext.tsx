import { createSignal, onCleanup } from 'solid-js';
import { useEditorStateManager } from './EditorProvider';

export const useEditorEnabled = () => {
  const manager = useEditorStateManager();
  const [enabled, setEnabled] = createSignal<boolean>(
    manager.editorEnabled.value ?? false
  );

  const handler = (e: Event) => setEnabled((e as CustomEvent<boolean>).detail);
  manager.editorEnabled.addEventListener('change', handler);
  onCleanup(() => manager.editorEnabled.removeEventListener('change', handler));

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
    manager.messenger.send(`INTLAYER_EDITOR_ENABLED/get`);
  };
};

export const usePostEditorEnabledState = () => {
  const manager = useEditorStateManager();
  return () => manager.editorEnabled.postCurrentValue();
};
