'use client';

import {
  type Dictionary,
  type DictionaryValue,
  type KeyPath,
} from '@intlayer/core';
import {
  editDictionaryByKeyPath,
  getDictionaryValueByKeyPath,
  renameDictionaryValueByKeyPath,
} from '@intlayer/editor';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
import {
  DictionaryContent,
  useDictionariesRecord,
} from './DictionariesRecordContext';
import { useCrossFrameState } from './useCrossFrameState';

type EditedContentStateContextType = {
  editedContent: DictionaryContent;
};

const EditedContentStateContext = createContext<
  EditedContentStateContextType | undefined
>(undefined);

type EditedContentActionsContextType = {
  setEditedContent: (
    dictionaryKey: Dictionary['key'],
    newValue: DictionaryValue
  ) => void;
  addEditedContent: (
    dictionaryKey: Dictionary['key'],
    newValue: DictionaryValue,
    keyPath?: KeyPath[],
    overwrite?: boolean
  ) => void;
  renameEditedContent: (
    dictionaryKey: Dictionary['key'],
    newKey: KeyPath['key'],
    keyPath?: KeyPath[]
  ) => void;
  removeEditedContent: (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ) => void;
  restoreEditedContent: (dictionaryKey: Dictionary['key']) => void;
  clearEditedDictionaryContent: (dictionaryKey: Dictionary['key']) => void;
  clearEditedContent: () => void;
  getEditedContentValue: (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ) => DictionaryValue | undefined;
};

const EditedContentActionsContext = createContext<
  EditedContentActionsContextType | undefined
>(undefined);

export const EditedContentProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dictionariesRecord } = useDictionariesRecord();
  const [editedContent, setEditedContentState] =
    useCrossFrameState<DictionaryContent>(
      'INTLAYER_EDITED_CONTENT_CHANGED',
      {}
    );

  const setEditedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: DictionaryValue
  ) => {
    setEditedContentState((prev) => ({
      ...prev,
      [dictionaryKey]: {
        ...prev[dictionaryKey],
        content: newValue,
      },
    }));
  };

  const addEditedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: DictionaryValue,
    keyPath: KeyPath[] = [],
    overwrite: boolean = true
  ) => {
    setEditedContentState((prev) => {
      // Get the starting content: edited version if available, otherwise a deep copy of the original
      const originalContent = dictionariesRecord[dictionaryKey]?.content;
      const currentContent =
        prev[dictionaryKey]?.content ||
        JSON.parse(JSON.stringify(originalContent));

      let newKeyPath = keyPath;
      if (!overwrite) {
        // Find a unique key based on the keyPath provided
        let index = 0;
        const otherKeyPath = keyPath.slice(0, -1);
        const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];
        let finalKey = lastKeyPath.key;

        // Loop until we find a key that does not exist
        while (
          typeof getDictionaryValueByKeyPath(currentContent, newKeyPath) !==
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
        [dictionaryKey]: {
          ...prev[dictionaryKey],
          content: updatedContent,
        },
      };
    });
  };

  const renameEditedContent = (
    dictionaryKey: Dictionary['key'],
    newKey: KeyPath['key'],
    keyPath: KeyPath[] = []
  ) => {
    setEditedContentState((prev) => {
      // Retrieve the base content: use edited version if available, otherwise deep copy of original
      const originalContent = dictionariesRecord[dictionaryKey]?.content;
      const currentContent =
        prev[dictionaryKey]?.content ||
        JSON.parse(JSON.stringify(originalContent));

      const contentWithNewField = renameDictionaryValueByKeyPath(
        currentContent,
        newKey,
        keyPath
      );

      return {
        ...prev,
        [dictionaryKey]: {
          ...prev[dictionaryKey],
          content: contentWithNewField,
        },
      };
    });
  };

  const removeEditedContent = (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ) => {
    setEditedContentState((prev) => {
      // Retrieve the original content as reference
      const originalContent = dictionariesRecord[dictionaryKey]?.content;
      const currentContent =
        prev[dictionaryKey]?.content ||
        JSON.parse(JSON.stringify(originalContent));

      // Get the initial value from the original dictionary content
      const initialContent = getDictionaryValueByKeyPath(
        originalContent,
        keyPath
      );

      // Restore the value at the given keyPath
      const restoredContent = editDictionaryByKeyPath(
        currentContent,
        keyPath,
        initialContent
      );

      return {
        ...prev,
        [dictionaryKey]: {
          ...prev[dictionaryKey],
          content: restoredContent,
        },
      };
    });
  };

  const restoreEditedContent = (dictionaryKey: Dictionary['key']) => {
    setEditedContentState((prev) => {
      const updated = { ...prev };
      delete updated[dictionaryKey];
      return updated;
    });
  };

  const clearEditedDictionaryContent = (dictionaryKey: Dictionary['key']) => {
    setEditedContentState((prev) => {
      const filtered = Object.entries(prev).reduce((acc, [key, value]) => {
        if (key === dictionaryKey) {
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
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ): DictionaryValue | undefined => {
    const currentContent = editedContent[dictionaryKey]?.content || {};
    return getDictionaryValueByKeyPath(currentContent, keyPath);
  };

  return (
    <EditedContentStateContext.Provider
      value={{
        editedContent,
      }}
    >
      <EditedContentActionsContext.Provider
        value={{
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

export const useEditedContentActions = () => {
  const context = useContext(EditedContentActionsContext);

  if (!context) {
    throw new Error(
      'useEditedContent must be used within an EditedContentActionsProvider'
    );
  }

  return context;
};

export const useEditedContent = () => {
  const stateContext = useContext(EditedContentStateContext);
  const actionContext = useEditedContentActions();

  if (!stateContext) {
    throw new Error(
      'useEditedContent must be used within an EditedContentStateProvider'
    );
  }

  return { ...stateContext, ...actionContext };
};
