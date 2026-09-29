'use client';

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
    manager?.editorEnabled.value ?? false
  );

  useEffect(() => {
    if (!manager) return;

    const handler = (e: Event) =>
      setEnabled((e as CustomEvent<boolean>).detail);
    manager.editorEnabled.addEventListener('change', handler);
    return () => manager.editorEnabled.removeEventListener('change', handler);
  }, [manager]);

  return { enabled };
};

/**
 * Returns a function that re-pings the client via ARE_YOU_THERE.
 * Use this as the onClick for an "Enable Editor" / reconnect button.
 */
export const useEditorPingClient = (): (() => void) => {
  const manager = useEditorStateManager();

  return () => manager?.pingClient();
};
