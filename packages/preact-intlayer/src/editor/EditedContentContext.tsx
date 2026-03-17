import type { DictionaryContent } from '@intlayer/editor';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useEffect, useState } from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

export const useEditedContent = () => {
  const manager = useEditorStateManager();
  const [editedContent, setEditedContentState] = useState<
    DictionaryContent | undefined
  >(manager?.editedContent.value);

  useEffect(() => {
    if (!manager) return;

    const handler = (e: Event) =>
      setEditedContentState((e as CustomEvent<DictionaryContent>).detail);
    manager.editedContent.addEventListener('change', handler);
    return () => manager.editedContent.removeEventListener('change', handler);
  }, [manager]);

  return {
    editedContent,
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

export const useGetEditedContentState = () => {
  const manager = useEditorStateManager();
  return () => manager?.messenger.send('INTLAYER_EDITED_CONTENT_CHANGED/get');
};

export const usePostEditedContentState = () => {
  const manager = useEditorStateManager();
  return () => manager?.editedContent.postCurrentValue();
};
