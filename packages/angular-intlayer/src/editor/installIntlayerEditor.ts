import configuration from '@intlayer/config/built';
import type { EditorStateManager, MessengerConfig } from '@intlayer/editor';

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

let globalManager: EditorStateManager | null = null;

export const installIntlayerEditor = (): void => {
  if (globalManager) return;

  import('@intlayer/editor').then(
    ({ defineIntlayerElements, EditorStateManager }) => {
      if (globalManager) return; // check again after async

      const manager = new EditorStateManager({
        mode: 'client',
        messenger: buildDefaultMessengerConfig() as MessengerConfig,
        configuration,
      });

      globalManager = manager;
      defineIntlayerElements();
      manager.start();
    }
  );
};

export const getEditorStateManager = (): EditorStateManager | null =>
  globalManager;
