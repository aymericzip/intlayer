import configuration from '@intlayer/config/built';
import { EditorStateManager, type MessengerConfig } from '@intlayer/editor';
import { getContext, setContext } from 'svelte';

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

const MANAGER_KEY = Symbol('INTLAYER_EDITOR_STATE_MANAGER');

let globalManager: EditorStateManager | null = null;

export const createEditorStateManager = (): EditorStateManager => {
  const manager = new EditorStateManager({
    mode: 'client',
    messenger: buildDefaultMessengerConfig(),
    configuration,
  });

  try {
    setContext(MANAGER_KEY, manager);
  } catch {
    // Outside component context
  }

  globalManager = manager;
  return manager;
};

export const getEditorStateManager = (): EditorStateManager => {
  try {
    const ctx = getContext<EditorStateManager>(MANAGER_KEY);
    if (ctx) return ctx;
  } catch {
    // Outside component context
  }

  if (!globalManager) {
    return createEditorStateManager();
  }
  return globalManager;
};

// Backward-compat alias
export const useCommunicator = () => {
  const manager = getEditorStateManager();
  return {
    postMessage: (data: any) => manager.messenger.send(data.type, data.data),
    senderId: manager.messenger.senderId,
  };
};
