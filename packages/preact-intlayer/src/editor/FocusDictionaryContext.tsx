'use client';

import { MessageKey } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types';
import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
} from 'preact/compat';
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
