'use client';

import type { KeyPath } from '@intlayer/core';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { useCrossFrameState } from './useCrossFrameState';

type DictionaryPath = string;

export type FileContent = {
  dictionaryKey: string;
  keyPath?: KeyPath[];
  dictionaryPath?: DictionaryPath;
};

type FocusDictionaryState = {
  focusedContent: FileContent | null;
};

type FocusDictionaryActions = {
  setFocusedContent: (content: FileContent | null) => void;
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
  const [focusedContent, setFocusedContentState] =
    useCrossFrameState<FileContent | null>(
      'INTLAYER_FOCUSED_CONTENT_CHANGED',
      null
    );

  const setFocusedContent = (content: FileContent | null) => {
    setFocusedContentState(content);
  };

  const setFocusedContentKeyPath = (keyPath: KeyPath[]) => {
    setFocusedContentState((prev) => {
      if (!prev) {
        return prev; // nothing to update if there's no focused content
      }
      return { ...prev, keyPath };
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
