import { Injector, signal } from '@angular/core';
import type { Dictionary } from '@intlayer/core';

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

  const stateSignal = signal<ChangedContent['content']>({});

  /**
   * Sets the content for a specific dictionary
   * @param dictionaryKey - The key of the dictionary to update
   * @param newValue - The new content to set
   */
  const setChangedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: Dictionary['content']
  ) => {
    const currentState = stateSignal();
    stateSignal.set({
      ...currentState,
      [dictionaryKey]: {
        ...(currentState[dictionaryKey] ?? { key: dictionaryKey, content: {} }),
        content: newValue,
      } as Dictionary,
    });
  };

  instance = {
    get content() {
      return stateSignal();
    },
    setContent: setChangedContent,
  };

  return instance;
};

/**
 * Helper to install the Intlayer provider into the injector
 */
export const installChangedContent = (injector: Injector) => {
  const client = createChangedContentClient();

  // Angular doesn't have a direct equivalent to Vue's app.provide
  // The client is stored as a singleton and accessed via createChangedContentClient
};

export const useChangedContent = () => {
  return createChangedContentClient();
};
