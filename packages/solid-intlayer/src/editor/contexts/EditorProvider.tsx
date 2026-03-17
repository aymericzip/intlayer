import configuration from '@intlayer/config/built';
import type { EditorStateManager, MessengerConfig } from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  type Accessor,
  type Component,
  createContext,
  createSignal,
  onCleanup,
  onMount,
  type ParentProps,
  useContext,
} from 'solid-js';

const { editor } = configuration ?? {};

const buildDefaultMessengerConfig = () => ({
  allowedOrigins: [
    editor?.applicationURL,
    editor?.editorURL,
    editor?.cmsURL,
  ].filter(Boolean) as string[],
  postMessageFn: (payload: any, origin: string) => {
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

// Context holds the signal accessor so consumers can track it reactively
const EditorStateContext = createContext<Accessor<EditorStateManager | null>>(
  () => null
);

/**
 * Returns the current EditorStateManager.
 * Call inside a reactive scope (createEffect/createMemo) to track changes.
 */
export const useEditorStateManager = (): EditorStateManager | null =>
  useContext(EditorStateContext)();

/**
 * Returns the raw signal accessor — use this inside createEffect to react
 * when the manager transitions from null to its loaded value.
 */
export const useEditorStateManagerAccessor =
  (): Accessor<EditorStateManager | null> => useContext(EditorStateContext);

export const EditorProvider: Component<ParentProps<EditorProviderProps>> = (
  props
) => {
  const [manager, setManager] = createSignal<EditorStateManager | null>(null);

  onMount(() => {
    import('@intlayer/editor').then(
      ({ defineIntlayerElements, EditorStateManager }) => {
        const messengerConfig: MessengerConfig =
          props.postMessage || props.allowedOrigins
            ? {
                allowedOrigins: props.allowedOrigins ?? ['*'],
                postMessageFn: props.postMessage
                  ? (payload) => props.postMessage!(payload)
                  : buildDefaultMessengerConfig().postMessageFn,
              }
            : (buildDefaultMessengerConfig() as MessengerConfig);

        const editorManager = new EditorStateManager({
          mode: props.mode ?? 'client',
          messenger: messengerConfig,
          configuration: props.configuration ?? configuration,
        });

        defineIntlayerElements();
        editorManager.start();
        setManager(editorManager);
      }
    );
  });

  onCleanup(() => manager()?.stop());

  // Provide the signal accessor (not its current value) so consumers can
  // reactively track when the manager transitions from null → loaded.
  return (
    <EditorStateContext.Provider value={manager}>
      {props.children}
    </EditorStateContext.Provider>
  );
};

// Re-export for backward compat
export type { EditorProviderProps as CommunicatorProviderProps };
export type ConfigurationProviderProps = { configuration?: IntlayerConfig };
