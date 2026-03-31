import { default as configuration, editor } from '@intlayer/config/built';
import { defineIntlayerElements } from '../components';
import type { MessengerConfig } from './CrossFrameMessenger';
import { EditorStateManager } from './EditorStateManager';
import {
  getGlobalEditorManager,
  setGlobalEditorManager,
} from './globalManager';

export const buildClientMessengerConfig = (): MessengerConfig => {
  return {
    allowedOrigins: [editor?.editorURL, editor?.cmsURL].filter(
      Boolean
    ) as string[],
    postMessageFn: (payload: unknown, origin: string) => {
      if (typeof window === 'undefined') return;

      const isInIframe = window.self !== window.top;

      if (!isInIframe) return;
      window.parent?.postMessage(payload, origin);
    },
  };
};

/** Reference count — tracks how many providers have called initEditorClient. */
let _clientRefCount = 0;

/**
 * Initialize the Intlayer editor client singleton.
 * Safe to call multiple times — returns the existing manager if already initialized.
 * Increments a reference counter so nested providers don't destroy the manager
 * prematurely when the inner provider unmounts.
 */
export const initEditorClient = (): EditorStateManager => {
  _clientRefCount++;

  const existing = getGlobalEditorManager();
  if (existing) return existing;

  const manager = new EditorStateManager({
    mode: 'client',
    messenger: buildClientMessengerConfig(),
    configuration,
  });

  setGlobalEditorManager(manager);
  defineIntlayerElements();
  manager.start();

  return manager;
};

/**
 * Decrement the reference count and stop the global editor client singleton
 * only when the last provider unmounts.
 */
export const stopEditorClient = (): void => {
  _clientRefCount = Math.max(0, _clientRefCount - 1);

  if (_clientRefCount > 0) return;

  const manager = getGlobalEditorManager();
  manager?.stop();
  setGlobalEditorManager(null);
};
