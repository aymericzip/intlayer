import type { ContentNode, Dictionary, KeyPath } from '@intlayer/core';
import { getContentNodeByKeyPath } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import { type App, inject, type Ref, readonly, ref, watch } from 'vue';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export type EditedContent = Record<Dictionary['key'], Dictionary>;

type EditedContentClient = {
  editedContent: Ref<EditedContent>;
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

  const editedContentRef = ref<EditedContent>({});

  instance = {
    editedContent: readonly(editedContentRef) as Ref<EditedContent>,
    getEditedContentValue: (
      dictionaryKey: Dictionary['key'],
      keyPath: KeyPath[]
    ): ContentNode | undefined => {
      const content = editedContentRef.value?.[dictionaryKey]?.content;
      if (!content) return undefined;

      return getContentNodeByKeyPath(content, keyPath);
    },
    setEditedContent: (editedContent: EditedContent) => {
      editedContentRef.value = editedContent;
    },
  };

  return instance;
};

/**
 * Helper to install the edited content into the app
 */
export const installEditedContent = (app: App) => {
  const client = createEditedContentClient();

  app.provide(INTLAYER_EDITED_CONTENT_SYMBOL, client);
};

export const useEditedContent = createSharedComposable(() => {
  const client = inject<EditedContentClient>(INTLAYER_EDITED_CONTENT_SYMBOL);

  if (!client) {
    throw new Error('EditedContent state not found');
  }

  const [edited, setEdited] = useCrossFrameState<EditedContent>(
    MessageKey.INTLAYER_EDITED_CONTENT_CHANGED,
    {}
  );

  watch(edited, (newValue) => {
    client.editedContent.value = newValue ?? {};
  });

  watch(client, (newValue) => {
    setEdited(newValue.editedContent.value);
  });

  return client;
});
