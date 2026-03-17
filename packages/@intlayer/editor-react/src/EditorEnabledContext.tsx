'use client';

import { MessageKey } from '@intlayer/editor';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type EditorEnabledStateProps = {
  enabled: boolean;
};

/**
 * Returns the current editor-enabled state, kept in sync with the shared
 * EditorStateManager. Replaces the old EditorEnabledContext + EditorEnabledProvider.
 */
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

/**
 * Subscribes to incoming "get" requests for editor-enabled state and calls
 * the provided callback so the caller can respond.
 * Used by the editor side to respond when the client asks for the current state.
 */
export const useGetEditorEnabledState = (onRequest?: () => void) => {
  const manager = useEditorStateManager();

  useEffect(() => {
    if (!onRequest) return;
    return manager.messenger.subscribe(
      `${MessageKey.INTLAYER_EDITOR_ENABLED}/get`,
      onRequest
    );
  }, [manager, onRequest]);
};

/**
 * Returns a function that sets the editor-enabled state and broadcasts it.
 */
export const usePostEditorEnabledState = () => {
  const manager = useEditorStateManager();
  return (value: boolean) => {
    manager.editorEnabled.set(value);
    manager.editorEnabled.postCurrentValue();
  };
};

export const useEditorEnabledState = () => {
  const { enabled } = useEditorEnabled();
  const manager = useEditorStateManager();
  const setter = (value: boolean) => manager.editorEnabled.set(value);
  return [enabled, setter] as const;
};
