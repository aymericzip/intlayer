import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { readable } from 'svelte/store';
import { getEditorStateManager } from './communicator';

export type { FileContent };

export type FocusDictionaryStateProps = {
  focusedContent: ReturnType<typeof readable<FileContent | null>>;
  setFocusedContent: (content: FileContent | null) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

export const useFocusDictionary = (): FocusDictionaryStateProps => {
  const manager = getEditorStateManager();

  const focusedContent = readable<FileContent | null>(
    manager.focusedContent.value ?? null,
    (set) => {
      const handler = (e: Event) =>
        set((e as CustomEvent<FileContent | null>).detail);
      manager.focusedContent.addEventListener('change', handler);
      return () =>
        manager.focusedContent.removeEventListener('change', handler);
    }
  );

  return {
    focusedContent,
    setFocusedContent: (content: FileContent | null) =>
      manager.focusedContent.set(content),
    setFocusedContentKeyPath: (keyPath: KeyPath[]) =>
      manager.setFocusedContentKeyPath(keyPath),
  };
};
