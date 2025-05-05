import type { Dictionary } from '@intlayer/core';
import { App, reactive } from 'vue';

/**
 * Singleton instance
 */
let instance: ChangedContent | null = null;

const INTLAYER_CHANGED_CONTENT_SYMBOL = Symbol('intlayerChangedContent');

type ChangedContent = {
  content: Record<Dictionary['key'], Dictionary>;
  setContent: (key: Dictionary['key'], newValue: Dictionary['content']) => void;
};

export const createChangedContentClient = () => {
  if (instance) return instance;

  const state = reactive<ChangedContent['content']>({});

  /**
   * Sets the content for a specific dictionary
   * @param dictionaryKey - The key of the dictionary to update
   * @param newValue - The new content to set
   */
  const setChangedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: Dictionary['content']
  ) => {
    state[dictionaryKey] = {
      ...(state[dictionaryKey] ?? { key: dictionaryKey, content: {} }),
      content: newValue,
    } as Dictionary;
  };

  return {
    state,
    setChangedContent,
  };
};

/**
 * Helper to install the Intlayer provider into the app
 */
export const installChangedContent = (app: App) => {
  const client = createChangedContentClient();

  app.provide(INTLAYER_CHANGED_CONTENT_SYMBOL, client);
};

export const useChangedContent = () => {
  const ref = reactive(createChangedContentClient());

  return ref;
};
