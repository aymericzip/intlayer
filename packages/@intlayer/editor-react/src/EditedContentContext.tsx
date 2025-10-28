'use client';

import {
  editDictionaryByKeyPath,
  getContentNodeByKeyPath,
  renameContentNodeByKeyPath,
} from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import type {
  ContentNode,
  Dictionary,
  KeyPath,
  LocalDictionaryId,
} from '@intlayer/types';
import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
} from 'react';
import {
  type DictionaryContent,
  useDictionariesRecord,
} from './DictionariesRecordContext';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';
import { useCrossFrameState } from './useCrossFrameState';
import { useEditorLocale } from './useEditorLocale';

type EditedContentStateContextType = {
  editedContent: Record<LocalDictionaryId, Dictionary> | undefined;
};

const EditedContentStateContext = createContext<
  EditedContentStateContextType | undefined
>(undefined);

export const usePostEditedContentState = <S,>(
  onEventTriggered?: (data: S) => void
) =>
  useCrossFrameMessageListener(
    `${MessageKey.INTLAYER_EDITED_CONTENT_CHANGED}/post`,
    onEventTriggered
  );

export const useGetEditedContentState = <S,>(
  onEventTriggered?: (data: S) => void
) =>
  useCrossFrameMessageListener(
    `${MessageKey.INTLAYER_EDITED_CONTENT_CHANGED}/get`,
    onEventTriggered
  );

type EditedContentActionsContextType = {
  setEditedContentState: (editedContent: DictionaryContent) => void;
  setEditedDictionary: Dispatch<SetStateAction<Dictionary>>;
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

const EditedContentActionsContext = createContext<
  EditedContentActionsContextType | undefined
>(undefined);

const resolveState = <S,>(state?: SetStateAction<S>, prevState?: S): S =>
  typeof state === 'function'
    ? (state as (prevState?: S) => S)(prevState)
    : (state as S);

export const EditedContentProvider: FC<PropsWithChildren> = ({ children }) => {
  const { localeDictionaries } = useDictionariesRecord();
  const currentLocale = useEditorLocale();

  const [editedContent, setEditedContentState] =
    useCrossFrameState<DictionaryContent>(
      MessageKey.INTLAYER_EDITED_CONTENT_CHANGED
    );

  const setEditedDictionary: Dispatch<SetStateAction<Dictionary>> = (
    newValue
  ) => {
    let updatedDictionaries: Dictionary = resolveState(newValue);

    setEditedContentState((prev) => {
      if (!updatedDictionaries.localId) {
        console.error('no localId', updatedDictionaries);

        return prev;
      }

      updatedDictionaries = resolveState(
        newValue,
        prev?.[updatedDictionaries.localId]
      );

      return {
        ...prev,
        [updatedDictionaries.localId as LocalDictionaryId]: updatedDictionaries,
      };
    });

    return updatedDictionaries;
  };

  const setEditedContent = (
    localDictionaryId: LocalDictionaryId,
    newValue: Dictionary['content']
  ) => {
    setEditedContentState((prev) => ({
      ...prev,
      [localDictionaryId]: {
        ...prev?.[localDictionaryId],
        content: newValue,
      },
    }));
  };

  const addEditedContent = (
    localDictionaryId: LocalDictionaryId,
    newValue: ContentNode,
    keyPath: KeyPath[] = [],
    overwrite: boolean = true
  ) => {
    setEditedContentState((prev) => {
      // Get the starting content: edited version if available, otherwise a deep copy of the original
      const originalContent = localeDictionaries[localDictionaryId]?.content;
      const currentContent = structuredClone(
        prev?.[localDictionaryId]?.content ?? originalContent
      );

      let newKeyPath = keyPath;
      if (!overwrite) {
        // Find a unique key based on the keyPath provided
        let index = 0;

        const otherKeyPath = keyPath.slice(0, -1);
        const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];

        let finalKey = lastKeyPath.key;

        // Loop until we find a key that does not exist
        while (
          typeof getContentNodeByKeyPath(currentContent, newKeyPath) !==
          'undefined'
        ) {
          index++;
          finalKey =
            index === 0 ? lastKeyPath.key : `${lastKeyPath.key} (${index})`;
          newKeyPath = [
            ...otherKeyPath,
            { ...lastKeyPath, key: finalKey } as KeyPath,
          ];
        }
      }

      const updatedContent = editDictionaryByKeyPath(
        currentContent,
        newKeyPath,
        newValue
      );

      return {
        ...prev,
        [localDictionaryId]: {
          ...prev?.[localDictionaryId],
          content: updatedContent as Dictionary['content'],
        },
      };
    });
  };

  const renameEditedContent = (
    localDictionaryId: LocalDictionaryId,
    newKey: KeyPath['key'],
    keyPath: KeyPath[] = []
  ) => {
    setEditedContentState((prev) => {
      // Retrieve the base content: use edited version if available, otherwise deep copy of original
      const originalContent = localeDictionaries[localDictionaryId]?.content;
      const currentContent = structuredClone(
        prev?.[localDictionaryId]?.content ?? originalContent
      );

      const contentWithNewField = renameContentNodeByKeyPath(
        currentContent,
        newKey,
        keyPath
      );

      return {
        ...prev,
        [localDictionaryId]: {
          ...prev?.[localDictionaryId],
          content: contentWithNewField as Dictionary['content'],
        },
      };
    });
  };

  const removeEditedContent = (
    localDictionaryId: LocalDictionaryId,
    keyPath: KeyPath[]
  ) => {
    setEditedContentState((prev) => {
      // Retrieve the original content as reference
      const originalContent = localeDictionaries[localDictionaryId]?.content;
      const currentContent = structuredClone(
        prev?.[localDictionaryId]?.content ?? originalContent
      );

      // Get the initial value from the original dictionary content
      const initialContent = getContentNodeByKeyPath(originalContent, keyPath);

      // Restore the value at the given keyPath
      const restoredContent = editDictionaryByKeyPath(
        currentContent,
        keyPath,
        initialContent
      );

      return {
        ...prev,
        [localDictionaryId]: {
          ...prev?.[localDictionaryId],
          content: restoredContent as Dictionary['content'],
        },
      };
    });
  };

  const restoreEditedContent = (localDictionaryId: LocalDictionaryId) => {
    setEditedContentState((prev) => {
      const updated = { ...prev };
      delete updated[localDictionaryId];
      return updated;
    });
  };

  const clearEditedDictionaryContent = (
    localDictionaryId: LocalDictionaryId
  ) => {
    setEditedContentState((prev) => {
      const filtered = Object.entries(prev).reduce((acc, [key, value]) => {
        if (key === localDictionaryId) {
          return acc;
        }
        return { ...acc, [key]: value };
      }, {} as DictionaryContent);
      return filtered;
    });
  };

  const clearEditedContent = () => {
    setEditedContentState({});
  };

  const getEditedContentValue = (
    localDictionaryIdOrKey: LocalDictionaryId | Dictionary['key'] | string,
    keyPath: KeyPath[]
  ): ContentNode | undefined => {
    if (!editedContent) return undefined;

    const isDictionaryId =
      localDictionaryIdOrKey.includes(':local:') ||
      localDictionaryIdOrKey.includes(':remote:');

    if (isDictionaryId) {
      const currentContent =
        editedContent?.[localDictionaryIdOrKey as LocalDictionaryId]?.content ??
        {};

      const contentNode = getContentNodeByKeyPath(
        currentContent,
        keyPath,
        currentLocale
      );

      return contentNode;
    }

    const filteredDictionariesLocalId = Object.keys(editedContent).filter(
      (key) => key.startsWith(`${localDictionaryIdOrKey}:`)
    );

    for (const localDictionaryId of filteredDictionariesLocalId) {
      const currentContent =
        editedContent?.[localDictionaryId as LocalDictionaryId]?.content ?? {};
      const contentNode = getContentNodeByKeyPath(
        currentContent,
        keyPath,
        currentLocale
      );

      if (contentNode) return contentNode;
    }

    return undefined;
  };

  return (
    <EditedContentStateContext.Provider
      value={{
        editedContent,
      }}
    >
      <EditedContentActionsContext.Provider
        value={{
          setEditedContentState,
          setEditedDictionary,
          setEditedContent,
          addEditedContent,
          renameEditedContent,
          removeEditedContent,
          restoreEditedContent,
          clearEditedDictionaryContent,
          clearEditedContent,
          getEditedContentValue,
        }}
      >
        {children}
      </EditedContentActionsContext.Provider>
    </EditedContentStateContext.Provider>
  );
};

export const useEditedContentActions = () =>
  useContext(EditedContentActionsContext);

export const useEditedContent = () => {
  const stateContext = useContext(EditedContentStateContext);
  const actionContext = useEditedContentActions();

  return { ...stateContext, ...actionContext };
};
