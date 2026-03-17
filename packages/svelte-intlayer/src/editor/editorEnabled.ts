import { readable } from 'svelte/store';
import { getEditorStateManager } from './communicator';

export type EditorEnabledStateProps = {
  enabled: ReturnType<typeof readable<boolean>>;
};

export const useEditorEnabled = (): EditorEnabledStateProps => {
  const manager = getEditorStateManager();

  const enabled = readable(manager.editorEnabled.value ?? false, (set) => {
    const handler = (e: Event) => set((e as CustomEvent<boolean>).detail);
    manager.editorEnabled.addEventListener('change', handler);
    return () => manager.editorEnabled.removeEventListener('change', handler);
  });

  return { enabled };
};
