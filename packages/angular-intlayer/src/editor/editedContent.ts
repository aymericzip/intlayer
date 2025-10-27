import { effect, type Injector, type Signal, signal } from '@angular/core';
import { getContentNodeByKeyPath } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import type {
  ContentNode,
  Dictionary,
  KeyPath,
  LocalDictionaryId,
} from '@intlayer/types';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export type EditedContent = Record<Dictionary['key'], Dictionary>;

type EditedContentClient = {
  editedContent: Signal<EditedContent>;
  setEditedContent: (editedContent: EditedContent) => void;
  getEditedContentValue: (
    localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
    keyPath: KeyPath[]
  ) => ContentNode | undefined;
};

/**
 * Singleton instance
 */
let instance: EditedContentClient | null = null;

const _INTLAYER_EDITED_CONTENT_SYMBOL = Symbol('EditedContent');

/**
 * Creates an edited content client
 */
export const createEditedContentClient = () => {
  if (instance) return instance;

  const editedContentSignal = signal<EditedContent>({});

  instance = {
    editedContent: editedContentSignal.asReadonly(),
    getEditedContentValue: (
      localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
      keyPath: KeyPath[]
    ): ContentNode | undefined => {
      const editedContent = editedContentSignal();

      if (!editedContent) return undefined;

      const isDictionaryId =
        localDictionaryIdOrKey.includes(':local:') ||
        localDictionaryIdOrKey.includes(':remote:');

      if (isDictionaryId) {
        const currentContent =
          editedContent?.[localDictionaryIdOrKey as LocalDictionaryId]
            ?.content ?? {};

        const contentNode = getContentNodeByKeyPath(currentContent, keyPath);

        return contentNode;
      }

      const filteredDictionariesLocalId = Object.keys(editedContent).filter(
        (key) => key.startsWith(`${localDictionaryIdOrKey}:`)
      );

      for (const localDictionaryId of filteredDictionariesLocalId) {
        const currentContent =
          editedContent?.[localDictionaryId as LocalDictionaryId]?.content ??
          {};
        const contentNode = getContentNodeByKeyPath(currentContent, keyPath);

        if (contentNode) return contentNode;
      }

      return undefined;
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
export const installEditedContent = (_injector: Injector) => {
  const _client = createEditedContentClient();

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
