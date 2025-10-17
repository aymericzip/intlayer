import { effect, type Injector, type Signal, signal } from '@angular/core';
import { MessageKey } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export type FileContent = {
  dictionaryKey: string;
  keyPath?: KeyPath[];
  dictionaryPath?: string;
};

type FocusDictionaryClient = {
  focusedContent: Signal<FileContent | null>;
  setFocusedContent: (focussedContent: FileContent | null) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

/**
 * Singleton instance
 */
let instance: FocusDictionaryClient | null = null;

/**
 * Creates a focus dictionary client
 */
export const createFocusDictionaryClient = () => {
  if (instance) return instance;

  const focusedContentSignal = signal<FileContent | null>(null);

  const setFocusedContent = (focussedContent: FileContent | null) => {
    focusedContentSignal.set(focussedContent);
  };

  const setFocusedContentKeyPath = (keyPath: KeyPath[]) => {
    const current = focusedContentSignal();
    if (!current) return;
    setFocusedContent({ ...current, keyPath });
  };

  instance = {
    focusedContent: focusedContentSignal.asReadonly(),
    setFocusedContent,
    setFocusedContentKeyPath,
  } as FocusDictionaryClient;

  return instance;
};

/**
 * Helper to install the focus dictionary into the injector
 */
export const installFocusDictionary = (_injector: Injector) => {
  const _client = createFocusDictionaryClient();

  // Angular doesn't have a direct equivalent to Vue's app.provide
  // The client is stored as a singleton and accessed via createFocusDictionaryClient
};

/** consumer */
export const useFocusDictionary = createSharedComposable(() => {
  const client = createFocusDictionaryClient();
  const [focusedContent, setFocusedContent] =
    useCrossFrameState<FileContent | null>(
      MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED
    );

  if (!client) {
    throw new Error('FocusDictionary state not found');
  }

  // Use Angular effects instead of Vue watchers
  // Watch local (client) and update cross-frame
  effect(() => {
    const newValue = client.focusedContent();
    if (JSON.stringify(newValue) !== JSON.stringify(focusedContent())) {
      setFocusedContent(newValue);
    }
  });

  // Watch cross-frame and update local
  effect(() => {
    const newValue = focusedContent();
    if (JSON.stringify(newValue) !== JSON.stringify(client.focusedContent())) {
      client.setFocusedContent(newValue ?? null);
    }
  });

  return client;
});
