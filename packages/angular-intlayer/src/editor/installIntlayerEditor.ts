import type { Injector } from '@angular/core';
import configuration from '@intlayer/config/built';
import {
  defineIntlayerElements,
  EditorStateManager,
  type MessengerConfig,
} from '@intlayer/editor';

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

let globalManager: EditorStateManager | null = null;

export const installIntlayerEditor = (_injector: Injector): void => {
  if (globalManager) return;

  const manager = new EditorStateManager({
    mode: 'client',
    messenger: buildDefaultMessengerConfig(),
    configuration,
  });

  globalManager = manager;
  defineIntlayerElements();
  manager.start();
};

export const getEditorStateManager = (): EditorStateManager | null =>
  globalManager;
