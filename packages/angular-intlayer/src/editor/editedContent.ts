import { effect, Injector, signal, Signal } from '@angular/core';
import type { ContentNode, Dictionary, KeyPath } from '@intlayer/core';
import { getContentNodeByKeyPath } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export type EditedContent = Record<Dictionary['key'], Dictionary>;

type EditedContentClient = {
  editedContent: Signal<EditedContent>;
  setEditedContent: (editedContent: EditedContent) => void;
  getEditedContentValue: (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ) => ContentNode | undefined;
};

/**
 * Singleton instance
 */
let instance: EditedContentClient | null = null;

const INTLAYER_EDITED_CONTENT_SYMBOL = Symbol('EditedContent');

/**
 * Creates an edited content client
 */
export const createEditedContentClient = () => {
  if (instance) return instance;

  const editedContentSignal = signal<EditedContent>({});

  instance = {
    editedContent: editedContentSignal.asReadonly(),
    getEditedContentValue: (
      dictionaryKey: Dictionary['key'],
      keyPath: KeyPath[]
    ): ContentNode | undefined => {
      const content = editedContentSignal()?.[dictionaryKey]?.content;
      if (!content) return undefined;

      return getContentNodeByKeyPath(content, keyPath);
    },
    setEditedContent: (editedContent: EditedContent) => {
      editedContentSignal.set(editedContent);
    },
  };

  return instance;
};

/**
 * Helper to install the edited content into the injector
 */
export const installEditedContent = (injector: Injector) => {
  const client = createEditedContentClient();

  // Angular doesn't have a direct equivalent to Vue's app.provide
  // The client is stored as a singleton and accessed via createEditedContentClient
};

export const useEditedContent = createSharedComposable(() => {
  const client = createEditedContentClient();

  if (!client) {
    throw new Error('EditedContent state not found');
  }

  const [edited, setEdited] = useCrossFrameState<EditedContent>(
    MessageKey.INTLAYER_EDITED_CONTENT_CHANGED,
    {}
  );

  // Use Angular effects instead of Vue watchers
  effect(() => {
    const newValue = edited();
    client.setEditedContent(newValue ?? {});
  });

  effect(() => {
    const newValue = client.editedContent();
    setEdited(newValue);
  });

  return client;
});
