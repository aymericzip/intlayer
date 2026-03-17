import type { DictionaryContent } from '@intlayer/editor';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { inject, onBeforeUnmount, onMounted, readonly, ref } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useEditedContent = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const editedContentRef = ref<DictionaryContent>(
    manager?.editedContent.value ?? {}
  );

  const handler = (e: Event) => {
    editedContentRef.value = (e as CustomEvent<DictionaryContent>).detail ?? {};
  };

  onMounted(() => {
    manager?.editedContent.addEventListener('change', handler);
  });

  onBeforeUnmount(() => {
    manager?.editedContent.removeEventListener('change', handler);
  });

  return {
    editedContent: readonly(editedContentRef),
    setEditedContent: (
      localId: LocalDictionaryId,
      value: Dictionary['content']
    ) => manager?.setEditedContent(localId, value),
    setEditedDictionary: (dict: Dictionary) =>
      manager?.setEditedDictionary(dict),
    addEditedContent: (
      localId: LocalDictionaryId,
      value: ContentNode,
      keyPath?: KeyPath[],
      overwrite?: boolean
    ) => manager?.addContent(localId, value, keyPath, overwrite),
    renameEditedContent: (
      localId: LocalDictionaryId,
      newKey: KeyPath['key'],
      keyPath?: KeyPath[]
    ) => manager?.renameContent(localId, newKey, keyPath),
    removeEditedContent: (localId: LocalDictionaryId, keyPath: KeyPath[]) =>
      manager?.removeContent(localId, keyPath),
    restoreEditedContent: (localId: LocalDictionaryId) =>
      manager?.restoreContent(localId),
    clearEditedDictionaryContent: (localId: LocalDictionaryId) =>
      manager?.clearContent(localId),
    clearEditedContent: () => manager?.clearAllContent(),
    getEditedContentValue: (
      localIdOrKey: LocalDictionaryId | string,
      keyPath: KeyPath[]
    ): ContentNode | undefined =>
      manager?.getContentValue(localIdOrKey, keyPath),
  };
};
