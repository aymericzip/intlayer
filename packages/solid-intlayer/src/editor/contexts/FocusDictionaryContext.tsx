import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { useEditorStateManagerAccessor } from './EditorProvider';

export type { FileContent };

export const useFocusDictionary = () => {
  const getManager = useEditorStateManagerAccessor();
  const [focusedContent, setFocusedContentSignal] =
    createSignal<FileContent | null>(null);

  createEffect(() => {
    const manager = getManager();
    if (!manager) return;

    setFocusedContentSignal(manager.focusedContent.value ?? null);
    const handler = (e: Event) =>
      setFocusedContentSignal((e as CustomEvent<FileContent | null>).detail);
    manager.focusedContent.addEventListener('change', handler);
    onCleanup(() =>
      manager.focusedContent.removeEventListener('change', handler)
    );
  });

  return {
    focusedContent,
    setFocusedContent: (value: FileContent | null) =>
      getManager()?.focusedContent.set(value),
    setFocusedContentKeyPath: (keyPath: KeyPath[]) =>
      getManager()?.setFocusedContentKeyPath(keyPath),
  };
};

export const useFocusDictionaryActions = () => {
  const { setFocusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  return { setFocusedContent, setFocusedContentKeyPath };
};
