'use client';

import type { Dictionary, DictionaryValue } from '@intlayer/core';
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
    newValue: DictionaryValue
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
    newValue: DictionaryValue
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
    <ChangedContentStateContext.Provider
      value={{
        changedContent,
      }}
    >
      <ChangedContentActionsContext.Provider
        value={{
          setChangedContent,
        }}
      >
        {children}
      </ChangedContentActionsContext.Provider>
    </ChangedContentStateContext.Provider>
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
