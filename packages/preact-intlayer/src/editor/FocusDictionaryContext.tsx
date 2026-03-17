import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useEffect, useState } from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

export type { FileContent };

export const useFocusDictionary = () => {
  const manager = useEditorStateManager();
  const [focusedContent, setFocusedContentState] = useState<FileContent | null>(
    manager.focusedContent.value ?? null
  );

  useEffect(() => {
    const handler = (e: Event) =>
      setFocusedContentState((e as CustomEvent<FileContent | null>).detail);
    manager.focusedContent.addEventListener('change', handler);
    return () => manager.focusedContent.removeEventListener('change', handler);
  }, [manager]);

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
