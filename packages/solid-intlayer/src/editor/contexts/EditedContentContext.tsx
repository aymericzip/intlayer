import {
  editDictionaryByKeyPath,
  getContentNodeByKeyPath,
  renameContentNodeByKeyPath,
  type ContentNode,
  type Dictionary,
  type KeyPath,
} from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import {
  createContext,
  useContext,
  type Component,
  type ParentProps,
} from 'solid-js';
import {
  useDictionariesRecord,
  type DictionaryContent,
} from './DictionariesRecordContext';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';
import { useCrossFrameState } from './useCrossFrameState';

type EditedContentStateContextType = {
  editedContent: Record<Dictionary['key'], Dictionary> | undefined;
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

type SetStateAction<T> = T | ((prevState?: T) => T);

type EditedContentActionsContextType = {
  setEditedContentState: (
    editedContent: Record<Dictionary['key'], Dictionary>
  ) => void;
  setEditedDictionary: (
    newValue: Dictionary | ((prev?: Dictionary) => Dictionary)
  ) => void;
  setEditedContent: (
    dictionaryKey: Dictionary['key'],
    newValue: Dictionary['content']
  ) => void;
  addEditedContent: (
    dictionaryKey: Dictionary['key'],
    newValue: ContentNode<any>,
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
  ) => ContentNode | undefined;
};

const EditedContentActionsContext = createContext<
  EditedContentActionsContextType | undefined
>(undefined);

const resolveState = <S,>(state?: SetStateAction<S>, prevState?: S): S =>
  typeof state === 'function'
    ? (state as (prevState?: S) => S)(prevState)
    : (state as S);

export const EditedContentProvider: Component<ParentProps> = (props) => {
  const { localeDictionaries } = useDictionariesRecord();

  const [editedContent, setEditedContentState] =
    useCrossFrameState<DictionaryContent>(
      MessageKey.INTLAYER_EDITED_CONTENT_CHANGED
    );

  const setEditedDictionary = (
    newValue: Dictionary | ((prev?: Dictionary) => Dictionary)
  ) => {
    if (typeof newValue === 'function') {
      setEditedContentState((prev) => {
        const currentDict = prev?.[Object.keys(prev || {})[0]];
        const updatedDictionary = (
          newValue as (prev?: Dictionary) => Dictionary
        )(currentDict);

        return {
          ...prev,
          [updatedDictionary.key]: updatedDictionary,
        };
      });
    } else {
      const updatedDictionary = newValue as Dictionary;
      setEditedContentState((prev) => ({
        ...prev,
        [updatedDictionary.key]: updatedDictionary,
      }));
    }
  };

  const setEditedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: Dictionary['content']
  ) => {
    setEditedContentState((prev) => ({
      ...prev,
      [dictionaryKey]: {
        ...prev?.[dictionaryKey],
        content: newValue,
      },
    }));
  };

  const addEditedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: ContentNode,
    keyPath: KeyPath[] = [],
    overwrite: boolean = true
  ) => {
    setEditedContentState((prev) => {
      // Get the starting content: edited version if available, otherwise a deep copy of the original
      const originalContent = localeDictionaries[dictionaryKey]?.content;
      const currentContent = structuredClone(
        prev?.[dictionaryKey]?.content ?? originalContent
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
        [dictionaryKey]: {
          ...prev?.[dictionaryKey],
          content: updatedContent as Dictionary['content'],
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
      const originalContent = localeDictionaries[dictionaryKey]?.content;
      const currentContent = structuredClone(
        prev?.[dictionaryKey]?.content ?? originalContent
      );

      const contentWithNewField = renameContentNodeByKeyPath(
        currentContent,
        newKey,
        keyPath
      );

      return {
        ...prev,
        [dictionaryKey]: {
          ...prev?.[dictionaryKey],
          content: contentWithNewField as Dictionary['content'],
        },
      };
    });
  };

  const removeEditedContent = (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ) => {
    setEditedContentState((prev) => {
      // Get the starting content: edited version if available, otherwise a deep copy of the original
      const originalContent = localeDictionaries[dictionaryKey]?.content;
      const currentContent = structuredClone(
        prev?.[dictionaryKey]?.content ?? originalContent
      );

      // Deep clone to avoid mutation
      const contentWithoutField = structuredClone(currentContent);

      // Navigate to the parent of the target and delete the specified field
      const parentKeyPath = keyPath.slice(0, -1);
      const targetKey = keyPath[keyPath.length - 1]?.key;

      if (targetKey) {
        const parentNode = getContentNodeByKeyPath(
          contentWithoutField,
          parentKeyPath
        );
        if (
          parentNode &&
          typeof parentNode === 'object' &&
          targetKey in parentNode
        ) {
          delete (parentNode as any)[targetKey];
        }
      }

      return {
        ...prev,
        [dictionaryKey]: {
          ...prev?.[dictionaryKey],
          content: contentWithoutField as Dictionary['content'],
        },
      };
    });
  };

  const restoreEditedContent = (dictionaryKey: Dictionary['key']) => {
    setEditedContentState((prev) => {
      const newEditedContent = { ...prev };
      delete newEditedContent[dictionaryKey];
      return newEditedContent;
    });
  };

  const clearEditedDictionaryContent = (dictionaryKey: Dictionary['key']) => {
    setEditedContentState((prev) => ({
      ...prev,
      [dictionaryKey]: {
        ...prev?.[dictionaryKey],
        content: {},
      },
    }));
  };

  const clearEditedContent = () => {
    setEditedContentState({});
  };

  const getEditedContentValue = (
    dictionaryKey: Dictionary['key'],
    keyPath: KeyPath[]
  ): ContentNode | undefined => {
    const originalContent = localeDictionaries[dictionaryKey]?.content;
    const currentContent =
      editedContent()?.[dictionaryKey]?.content ?? originalContent;

    return getContentNodeByKeyPath(currentContent, keyPath);
  };

  const stateValue = {
    editedContent: editedContent(),
  };

  const actionValue = {
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
  };

  return (
    <EditedContentStateContext.Provider value={stateValue}>
      <EditedContentActionsContext.Provider value={actionValue}>
        {props.children}
      </EditedContentActionsContext.Provider>
    </EditedContentStateContext.Provider>
  );
};

export const useEditedContentActions = () =>
  useContext(EditedContentActionsContext);

export const useEditedContent = () => {
  const actionsContext = useEditedContentActions();
  const statesContext = useContext(EditedContentStateContext);

  if (!statesContext) {
    throw new Error(
      'useEditedContent must be used within a EditedContentProvider'
    );
  }

  return { ...statesContext, ...actionsContext };
};
