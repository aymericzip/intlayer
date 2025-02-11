'use client';

import type { Dictionary } from '@intlayer/core';
import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import type { DictionaryContent } from './DictionariesRecordContext';

type ChangedContentStateContextType = {
  changedContent: Record<Dictionary['key'], Dictionary> | undefined;
};

const ChangedContentStateContext = createContext<
  ChangedContentStateContextType | undefined
>(undefined);

type ChangedContentActionsContextType = {
  setChangedContent: (
    dictionaryKey: Dictionary['key'],
    newValue: Dictionary['content']
  ) => void;
};

const ChangedContentActionsContext = createContext<
  ChangedContentActionsContextType | undefined
>(undefined);

export const ChangedContentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [changedContent, setChangedContentState] = useState<DictionaryContent>(
    {}
  );

  const setChangedContent = (
    dictionaryKey: Dictionary['key'],
    newValue: Dictionary['content']
  ) => {
    setChangedContentState((prev) => ({
      ...prev,
      [dictionaryKey]: {
        ...prev?.[dictionaryKey],
        content: newValue,
      },
    }));
  };

  return (
    <ChangedContentStateContext
      value={{
        changedContent,
      }}
    >
      <ChangedContentActionsContext
        value={{
          setChangedContent,
        }}
      >
        {children}
      </ChangedContentActionsContext>
    </ChangedContentStateContext>
  );
};

export const useChangedContentActions = () => {
  const context = useContext(ChangedContentActionsContext);

  if (!context) {
    throw new Error(
      'useChangedContent must be used within an ChangedContentProvider'
    );
  }

  return context;
};

export const useChangedContent = () => {
  const stateContext = useContext(ChangedContentStateContext);
  const actionContext = useChangedContentActions();

  if (!stateContext) {
    throw new Error(
      'useChangedContent must be used within an ChangedContentProvider'
    );
  }

  return { ...stateContext, ...actionContext };
};
