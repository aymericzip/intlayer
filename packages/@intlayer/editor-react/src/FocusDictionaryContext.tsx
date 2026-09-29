'use client';

import type { CrossFrameStateAction, FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useCallback, useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type { FileContent } from '@intlayer/editor';

export type FocusDictionaryActions = {
  /** Accepts a value or an updater — `setFocusedContent(prev => …)`. */
  setFocusedContent: (value: CrossFrameStateAction<FileContent | null>) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

/**
 * Returns the content focused in the editor, shared with the client frame.
 */
export const useFocusDictionary = (): FocusDictionaryActions & {
  focusedContent: FileContent | null;
} => {
  const manager = useEditorStateManager();
  const [focusedContent, setFocusedContentState] = useState<FileContent | null>(
    manager?.focusedContent.value ?? null
  );

  useEffect(() => {
    if (!manager) return;

    const handleChange = (event: Event) =>
      setFocusedContentState((event as CustomEvent<FileContent | null>).detail);
    manager.focusedContent.addEventListener('change', handleChange);

    return () =>
      manager.focusedContent.removeEventListener('change', handleChange);
  }, [manager]);

  const setFocusedContent = useCallback(
    (value: CrossFrameStateAction<FileContent | null>) =>
      manager?.focusedContent.set(value),
    [manager]
  );

  const setFocusedContentKeyPath = useCallback(
    (keyPath: KeyPath[]) => manager?.setFocusedContentKeyPath(keyPath),
    [manager]
  );

  return { focusedContent, setFocusedContent, setFocusedContentKeyPath };
};
