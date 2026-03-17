import configuration from '@intlayer/config/built';
import type { EditorStateManager, MessengerConfig } from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
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

type FallbackProps = {
  fallback: ComponentChildren;
  children?: ComponentChildren;
};

const EditorEnabledCheckRenderer: FunctionComponent<FallbackProps> = ({
  children,
  fallback,
}) => {
  const { enabled } = useEditorEnabled();
  return enabled ? children : fallback;
};

const IframeCheckRenderer: FunctionComponent<FallbackProps> = ({
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
  children?: ComponentChildren;
};

export const EditorProvider: FunctionComponent<EditorProviderProps> = ({
  children,
  mode = 'client',
  configuration: configProp,
  postMessage: customPostMessage,
  allowedOrigins: customAllowedOrigins,
}) => {
  const [manager, setManager] = useState<EditorStateManager | null>(null);
  const managerRef = useRef<EditorStateManager | null>(null);

  useEffect(() => {
    let stopped = false;

    import('@intlayer/editor').then(
      ({ defineIntlayerElements, EditorStateManager }) => {
        if (stopped) return;

        const messengerConfig: MessengerConfig =
          customPostMessage || customAllowedOrigins
            ? {
                allowedOrigins: customAllowedOrigins ?? ['*'],
                postMessageFn: customPostMessage
                  ? (payload) => customPostMessage(payload)
                  : buildDefaultMessengerConfig().postMessageFn,
              }
            : buildDefaultMessengerConfig();

        const editorManager = new EditorStateManager({
          mode,
          messenger: messengerConfig,
          configuration: configProp ?? configuration,
        });

        managerRef.current = editorManager;
        defineIntlayerElements();
        editorManager.start();
        setManager(editorManager);
      }
    );

    return () => {
      stopped = true;
      managerRef.current?.stop();
      managerRef.current = null;
    };
  }, [mode]);

  // Cleanup when manager state changes (on unmount)
  useEffect(() => {
    return () => manager?.stop();
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

// Backward-compat types
export type CommunicatorProviderProps = {
  postMessage?: (data: any) => void;
  allowedOrigins?: string[];
};
export type ConfigurationProviderProps = { configuration?: IntlayerConfig };
