'use client';

import configuration from '@intlayer/config/built';
import {
  defineIntlayerElements,
  EditorStateManager,
  type MessengerConfig,
} from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useEditorEnabled } from './EditorEnabledContext';
import { EditorStateProvider } from './EditorStateContext';

const { editor } = configuration ?? {};

const buildDefaultMessengerConfig = (): MessengerConfig => ({
  allowedOrigins: [
    editor?.applicationURL,
    editor?.editorURL,
    editor?.cmsURL,
  ].filter(Boolean) as string[],
  postMessageFn: (payload, origin) => {
    if (typeof window === 'undefined') return;
    const isInIframe = window.self !== window.top;
    if (!isInIframe) return;
    window.parent?.postMessage(payload, origin);
    window.postMessage(payload, origin);
  },
});

type FallbackProps = { fallback: ReactNode };

const EditorEnabledCheckRenderer: FC<PropsWithChildren<FallbackProps>> = ({
  children,
  fallback,
}) => {
  const { enabled } = useEditorEnabled();
  return enabled ? children : fallback;
};

const IframeCheckRenderer: FC<PropsWithChildren<FallbackProps>> = ({
  children,
  fallback,
}) => {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  return isInIframe ? children : fallback;
};

export type EditorProviderProps = {
  mode?: 'editor' | 'client';
  configuration?: IntlayerConfig;
  postMessage?: (data: any) => void;
  allowedOrigins?: string[];
};

/**
 * EditorProvider creates and manages the lifecycle of an EditorStateManager,
 * provides it to all descendants, and registers the Lit web components.
 */
export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  mode = 'client',
  configuration: configProp,
  postMessage: customPostMessage,
  allowedOrigins: customAllowedOrigins,
}) => {
  const managerRef = useRef<EditorStateManager | null>(null);
  if (!managerRef.current) {
    const messengerConfig: MessengerConfig =
      customPostMessage || customAllowedOrigins
        ? {
            allowedOrigins: customAllowedOrigins ?? ['*'],
            postMessageFn: customPostMessage
              ? (payload) => customPostMessage(payload)
              : buildDefaultMessengerConfig().postMessageFn,
          }
        : buildDefaultMessengerConfig();
    managerRef.current = new EditorStateManager({
      mode,
      messenger: messengerConfig,
      configuration: configProp ?? configuration,
    });
  }
  const manager = managerRef.current;

  useEffect(() => {
    defineIntlayerElements();
    manager.start();
    return () => manager.stop();
  }, [manager]);

  const content =
    mode === 'editor' ? (
      children
    ) : (
      <IframeCheckRenderer fallback={children}>
        <EditorEnabledCheckRenderer fallback={children}>
          {children}
        </EditorEnabledCheckRenderer>
      </IframeCheckRenderer>
    );

  return <EditorStateProvider manager={manager}>{content}</EditorStateProvider>;
};
