import configuration from '@intlayer/config/built';
import type { EditorStateManager, MessengerConfig } from '@intlayer/editor';
import type { App } from 'vue';

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

export const INTLAYER_EDITOR_MANAGER_SYMBOL = Symbol(
  'INTLAYER_EDITOR_STATE_MANAGER'
);

let globalManager: EditorStateManager | null = null;

export const installIntlayerEditor = (app: App): void => {
  const { editor } = configuration ?? {};

  if (editor?.enabled === false || typeof window === 'undefined') return;

  import('@intlayer/editor').then(
    ({ defineIntlayerElements, EditorStateManager }) => {
      const manager = new EditorStateManager({
        mode: 'client',
        messenger: buildDefaultMessengerConfig() as MessengerConfig,
        configuration,
      });

      app.provide(INTLAYER_EDITOR_MANAGER_SYMBOL, manager);
      globalManager = manager;

      defineIntlayerElements();
      manager.start();
    }
  );
};

export const getEditorStateManager = (): EditorStateManager | null =>
  globalManager;
