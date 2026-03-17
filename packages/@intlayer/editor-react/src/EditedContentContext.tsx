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
  clearEditedDictionaryContent: (localDictionaryId: LocalDictionaryId) => void;
  clearEditedContent: () => void;
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
    clearEditedDictionaryContent: (localId) => manager?.clearContent(localId),
    clearEditedContent: () => manager?.clearAllContent(),
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

export const usePostEditedContentState = <S,>(
  onEventTriggered?: (data: S) => void
) => {
  const manager = useEditorStateManager();
  useEffect(() => {
    if (!onEventTriggered || !manager) return;
    return manager.messenger.subscribe(
      `INTLAYER_EDITED_CONTENT_CHANGED/post`,
      onEventTriggered as (data: unknown) => void
    );
  }, [manager, onEventTriggered]);
};

export const useGetEditedContentState = <S,>() => {
  const manager = useEditorStateManager();
  return () => {
    manager?.messenger.send('INTLAYER_EDITED_CONTENT_CHANGED/get');
  };
};
