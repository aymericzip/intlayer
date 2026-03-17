import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { createSignal, onCleanup } from 'solid-js';
import { useEditorStateManager } from './EditorProvider';

export type { FileContent };

export const useFocusDictionary = () => {
  const manager = useEditorStateManager();
  const [focusedContent, setFocusedContentSignal] =
    createSignal<FileContent | null>(manager.focusedContent.value ?? null);

  const handler = (e: Event) =>
    setFocusedContentSignal((e as CustomEvent<FileContent | null>).detail);
  manager.focusedContent.addEventListener('change', handler);
  onCleanup(() =>
    manager.focusedContent.removeEventListener('change', handler)
  );

  return {
    focusedContent,
    setFocusedContent: (value: FileContent | null) =>
      manager.focusedContent.set(value),
    setFocusedContentKeyPath: (keyPath: KeyPath[]) =>
      manager.setFocusedContentKeyPath(keyPath),
  };
};

export const useFocusDictionaryActions = () => {
  const { setFocusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  return { setFocusedContent, setFocusedContentKeyPath };
};
