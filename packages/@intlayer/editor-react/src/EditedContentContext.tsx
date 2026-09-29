'use client';

import type { DictionaryContent } from '@intlayer/editor';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type { DictionaryContent } from '@intlayer/editor';

type EditedContentActionsContextType = {
  setEditedContentState: (editedContent: DictionaryContent) => void;
  setEditedDictionary: (dict: Dictionary) => void;
  setEditedContent: (
    localDictionaryId: LocalDictionaryId,
    newValue: Dictionary['content']
  ) => void;
  addEditedContent: (
    localDictionaryId: LocalDictionaryId,
    newValue: ContentNode<any>,
    keyPath?: KeyPath[],
    overwrite?: boolean
  ) => void;
  renameEditedContent: (
    localDictionaryId: LocalDictionaryId,
    newKey: KeyPath['key'],
    keyPath?: KeyPath[]
  ) => void;
  removeEditedContent: (
    localDictionaryId: LocalDictionaryId,
    keyPath: KeyPath[]
  ) => void;
  restoreEditedContent: (localDictionaryId: LocalDictionaryId) => void;
  getEditedContentValue: (
    localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
    keyPath: KeyPath[]
  ) => ContentNode | undefined;
};

export const useEditedContentActions = (): EditedContentActionsContextType => {
  const manager = useEditorStateManager();

  return {
    setEditedContentState: (value: DictionaryContent) =>
      manager?.editedContent.set(value),
    setEditedDictionary: (dict: Dictionary) =>
      manager?.setEditedDictionary(dict),
    setEditedContent: (
      localId: LocalDictionaryId,
      value: Dictionary['content']
    ) => manager?.setEditedContent(localId, value),
    addEditedContent: (localId, value, keyPath, overwrite) =>
      manager?.addContent(localId, value, keyPath, overwrite),
    renameEditedContent: (localId, newKey, keyPath) =>
      manager?.renameContent(localId, newKey, keyPath),
    removeEditedContent: (localId, keyPath) =>
      manager?.removeContent(localId, keyPath),
    restoreEditedContent: (localId) => manager?.restoreContent(localId),
    getEditedContentValue: (localIdOrKey, keyPath) =>
      manager?.getContentValue(localIdOrKey, keyPath),
  };
};

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

  const actions = useEditedContentActions();
  return { editedContent, ...actions };
};
