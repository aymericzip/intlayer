import type { KeyPath } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import { App, inject, readonly, ref, Ref, watch } from 'vue';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export type FileContent = {
  dictionaryKey: string;
  keyPath?: KeyPath[];
  dictionaryPath?: string;
};

type FocusDictionaryClient = {
  focusedContent: Ref<FileContent | null>;
  setFocusedContent: (focussedContent: FileContent | null) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

/**
 * Singleton instance
 */
let instance: FocusDictionaryClient | null = null;

const INTLAYER_FOCUS_DICTIONARY_SYMBOL = Symbol('FocusDictionary');

/**
 * Creates a focus dictionary client
 */
export const createFocusDictionaryClient = () => {
  if (instance) return instance;

  const focusedContent = ref<FileContent | null>(null);

  const setFocusedContent = (focussedContent: FileContent | null) => {
    focusedContent.value = focussedContent;
  };

  const setFocusedContentKeyPath = (keyPath: KeyPath[]) => {
    if (!focusedContent.value) return;
    setFocusedContent({ ...focusedContent.value, keyPath });
  };

  instance = {
    focusedContent: readonly(focusedContent) as Ref<FileContent | null>,
    setFocusedContent,
    setFocusedContentKeyPath,
  } as FocusDictionaryClient;

  return instance;
};

/**
 * Helper to install the focus dictionary into the app
 */
export const installFocusDictionary = (app: App) => {
  const client = createFocusDictionaryClient();

  app.provide(INTLAYER_FOCUS_DICTIONARY_SYMBOL, client);
};

/** consumer */
export const useFocusDictionary = createSharedComposable(() => {
  const client = inject<FocusDictionaryClient>(
    INTLAYER_FOCUS_DICTIONARY_SYMBOL
  );
  const [focusedContent, setFocusedContent] =
    useCrossFrameState<FileContent | null>(
      MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED
    );

  if (!client) {
    throw new Error('FocusDictionary state not found');
  }

  // Watch local (client) and update cross-frame
  watch(client.focusedContent, (newValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(focusedContent.value)) {
      setFocusedContent(newValue);
    }
  });

  // Watch cross-frame and update local
  watch(focusedContent, (newValue) => {
    if (
      JSON.stringify(newValue) !== JSON.stringify(client.focusedContent.value)
    ) {
      client.setFocusedContent(newValue ?? null);
    }
  });

  return client;
});
