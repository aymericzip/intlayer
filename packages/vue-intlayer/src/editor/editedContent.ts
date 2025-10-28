import { getContentNodeByKeyPath } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import {
  type ContentNode,
  type Dictionary,
  type KeyPath,
  type LocalDictionaryId,
  NodeType,
} from '@intlayer/types';
import { type App, inject, type Ref, readonly, ref, watch } from 'vue';
import type { IntlayerProvider } from '../client';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export type EditedContent = Record<Dictionary['key'], Dictionary>;

type EditedContentClient = {
  editedContent: Ref<EditedContent>;
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

const INTLAYER_EDITED_CONTENT_SYMBOL = Symbol('EditedContent');

/**
 * Creates an edited content client
 */
export const createEditedContentClient = (
  localeProvider?: IntlayerProvider
) => {
  if (instance) return instance;

  const editedContentRef = ref<EditedContent>({});

  instance = {
    editedContent: readonly(editedContentRef) as Ref<EditedContent>,

    getEditedContentValue: (
      localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
      keyPath: KeyPath[]
    ): ContentNode | undefined => {
      const editedContent = editedContentRef.value;

      if (!editedContent) return undefined;

      const filteredKeyPath = keyPath.filter(
        (key) => key.type !== NodeType.Translation
      );

      const isDictionaryId =
        localDictionaryIdOrKey.includes(':local:') ||
        localDictionaryIdOrKey.includes(':remote:');

      // Get the current locale from the locale provider
      const currentLocale = localeProvider?.locale.value;

      if (isDictionaryId) {
        const currentContent =
          editedContent?.[localDictionaryIdOrKey as LocalDictionaryId]
            ?.content ?? {};

        const contentNode = getContentNodeByKeyPath(
          currentContent,
          filteredKeyPath,
          currentLocale
        );

        return contentNode;
      }

      const filteredDictionariesLocalId = Object.keys(editedContent).filter(
        (key) => key.startsWith(`${localDictionaryIdOrKey}:`)
      );

      for (const localDictionaryId of filteredDictionariesLocalId) {
        const currentContent =
          editedContent?.[localDictionaryId as LocalDictionaryId]?.content ??
          {};
        const contentNode = getContentNodeByKeyPath(
          currentContent,
          filteredKeyPath,
          currentLocale
        );

        if (contentNode) return contentNode;
      }

      return undefined;
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
export const installEditedContent = (
  app: App,
  localeProvider?: IntlayerProvider
) => {
  const client = createEditedContentClient(localeProvider);

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
