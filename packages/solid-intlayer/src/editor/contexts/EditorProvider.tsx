import configuration from '@intlayer/config/built';
import {
  defineIntlayerElements,
  EditorStateManager,
  type MessengerConfig,
} from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  type Component,
  createContext,
  onCleanup,
  onMount,
  type ParentProps,
  useContext,
} from 'solid-js';

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

export type EditorProviderProps = {
  mode?: 'editor' | 'client';
  configuration?: IntlayerConfig;
  postMessage?: (data: any) => void;
  allowedOrigins?: string[];
};

const EditorStateContext = createContext<EditorStateManager | null>(null);

export const useEditorStateManager = (): EditorStateManager => {
  const ctx = useContext(EditorStateContext);
  if (!ctx) throw new Error('useEditorStateManager: no EditorProvider found');
  return ctx;
};

export const EditorProvider: Component<ParentProps<EditorProviderProps>> = (
  props
) => {
  const messengerConfig: MessengerConfig =
    props.postMessage || props.allowedOrigins
      ? {
          allowedOrigins: props.allowedOrigins ?? ['*'],
          postMessageFn: props.postMessage
            ? (payload) => props.postMessage!(payload)
            : buildDefaultMessengerConfig().postMessageFn,
        }
      : buildDefaultMessengerConfig();

  const manager = new EditorStateManager({
    mode: props.mode ?? 'client',
    messenger: messengerConfig,
    configuration: props.configuration ?? configuration,
  });

  onMount(() => {
    defineIntlayerElements();
    manager.start();
  });

  onCleanup(() => manager.stop());

  return (
    <EditorStateContext.Provider value={manager}>
      {props.children}
    </EditorStateContext.Provider>
  );
};

// Re-export for backward compat
export type { EditorProviderProps as CommunicatorProviderProps };
export type ConfigurationProviderProps = { configuration?: IntlayerConfig };
