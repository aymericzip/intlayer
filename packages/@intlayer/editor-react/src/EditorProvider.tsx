'use client';

import {
  defineIntlayerElements,
  EditorStateManager,
  type MessengerConfig,
  setGlobalEditorManager,
} from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { EditorStateProvider } from './EditorStateContext';

export type EditorProviderProps = {
  configuration: IntlayerConfig;
  postMessage: (data: any) => void;
  allowedOrigins: string[];
};

/**
 * EditorProvider creates and manages the lifecycle of an EditorStateManager,
 * provides it to all descendants, and registers the Lit web components.
 */
export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  configuration,
  postMessage,
  allowedOrigins,
}) => {
  const managerRef = useRef<EditorStateManager | null>(null);

  if (!managerRef.current) {
    const messengerConfig: MessengerConfig = {
      allowedOrigins,
      postMessageFn: postMessage,
    };

    managerRef.current = new EditorStateManager({
      mode: 'editor',
      messenger: messengerConfig,
      configuration,
    });
  }
  const manager = managerRef.current;

  useEffect(() => {
    defineIntlayerElements();
    setGlobalEditorManager(manager);

    manager.start();
    return () => {
      manager.stop();
      setGlobalEditorManager(null);
    };
  }, [manager]);

  return (
    <EditorStateProvider manager={manager}>{children}</EditorStateProvider>
  );
};
