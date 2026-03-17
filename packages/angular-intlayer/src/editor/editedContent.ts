import { DestroyRef, inject, signal } from '@angular/core';
import type { DictionaryContent } from '@intlayer/editor';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { getEditorStateManager } from './installIntlayerEditor';

export const useEditedContent = () => {
  const manager = getEditorStateManager();
  const editedContent = signal<DictionaryContent | undefined>(
    manager?.editedContent.value
  );

  if (manager) {
    const handler = (e: Event) =>
      editedContent.set((e as CustomEvent<DictionaryContent>).detail);
    manager.editedContent.addEventListener('change', handler);

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(() =>
        manager.editedContent.removeEventListener('change', handler)
      );
    } catch {}
  }

  return {
    editedContent: editedContent.asReadonly(),
    setEditedContentState: (value: DictionaryContent) =>
      manager?.editedContent.set(value),
    setEditedDictionary: (dict: Dictionary) =>
      manager?.setEditedDictionary(dict),
    setEditedContent: (
      localId: LocalDictionaryId,
      value: Dictionary['content']
    ) => manager?.setEditedContent(localId, value),
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

export const useEditedContentActions = () => {
  const actions = useEditedContent();
  const { editedContent, ...rest } = actions;
  return rest;
};
