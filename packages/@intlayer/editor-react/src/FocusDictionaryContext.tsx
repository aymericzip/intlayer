'use client';

import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type { FileContent } from '@intlayer/editor';

export type FocusDictionaryState = {
  focusedContent: FileContent | null;
};

export type FocusDictionaryActions = {
  setFocusedContent: (value: FileContent | null) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

/**
 * Returns the focused-content state and setters, backed by EditorStateManager.
 */
export const useFocusDictionary = (): FocusDictionaryState &
  FocusDictionaryActions => {
  const manager = useEditorStateManager();
  const [focusedContent, setFocusedContentState] = useState<FileContent | null>(
    manager?.focusedContent.value ?? null
  );

  useEffect(() => {
    if (!manager) return;
    const handler = (e: Event) =>
      setFocusedContentState((e as CustomEvent<FileContent | null>).detail);
    manager.focusedContent.addEventListener('change', handler);
    return () => manager.focusedContent.removeEventListener('change', handler);
  }, [manager]);

  return {
    focusedContent,
    setFocusedContent: (value: FileContent | null) =>
      manager?.focusedContent.set(value),
    setFocusedContentKeyPath: (keyPath: KeyPath[]) =>
      manager?.setFocusedContentKeyPath(keyPath),
  };
};

export const useFocusDictionaryActions = (): FocusDictionaryActions => {
  const { setFocusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  return { setFocusedContent, setFocusedContentKeyPath };
};
