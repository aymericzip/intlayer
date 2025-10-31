'use client';

import { MessageKey } from '@intlayer/editor';
import {
  type KeyPath,
  type LocalDictionaryId,
  NodeType,
} from '@intlayer/types';
import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
} from 'react';
import { useCrossFrameState } from './useCrossFrameState';

export type FileContent = {
  dictionaryKey: string;
  dictionaryLocalId?: LocalDictionaryId;
  keyPath?: KeyPath[];
};

export type FocusDictionaryState = {
  focusedContent: FileContent | null;
};

export type FocusDictionaryActions = {
  setFocusedContent: Dispatch<SetStateAction<FileContent | null>>;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

const FocusDictionaryStateContext = createContext<
  FocusDictionaryState | undefined
>(undefined);
const FocusDictionaryActionsContext = createContext<
  FocusDictionaryActions | undefined
>(undefined);

export const FocusDictionaryProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [focusedContent, setFocusedContent] =
    useCrossFrameState<FileContent | null>(
      MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED,
      null
    );

  const setFocusedContentKeyPath = (keyPath: KeyPath[]) => {
    setFocusedContent((prev) => {
      if (!prev) {
        return prev; // nothing to update if there's no focused content
      }

      // Remove translation key path if it exists to make it more flexible with optimization client / editor
      const filteredKeyPath = keyPath.filter(
        (key) => key.type !== NodeType.Translation
      );

      return {
        ...prev,
        keyPath: filteredKeyPath,
      };
    });
  };

  return (
    <FocusDictionaryStateContext.Provider value={{ focusedContent }}>
      <FocusDictionaryActionsContext.Provider
        value={{ setFocusedContent, setFocusedContentKeyPath }}
      >
        {children}
      </FocusDictionaryActionsContext.Provider>
    </FocusDictionaryStateContext.Provider>
  );
};

export const useFocusDictionaryActions = () => {
  const context = useContext(FocusDictionaryActionsContext);
  if (context === undefined) {
    throw new Error(
      'useFocusDictionaryActions must be used within a FocusDictionaryProvider'
    );
  }
  return context;
};

export const useFocusDictionary = () => {
  const actionContext = useFocusDictionaryActions();
  const stateContext = useContext(FocusDictionaryStateContext);

  if (stateContext === undefined) {
    throw new Error(
      'useFocusDictionaryState must be used within a FocusDictionaryProvider'
    );
  }

  return { ...stateContext, ...actionContext };
};
