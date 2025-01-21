'use client';

import { type Dictionary } from '@intlayer/core';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { useCrossFrameState } from './useCrossFrameState';

export type DictionaryContent = Record<Dictionary['key'], Dictionary>;

type DictionariesRecordStatesContextType = {
  localeDictionaries: DictionaryContent;
  distantDictionaries: DictionaryContent;
};
type DictionariesRecordActionsContextType = {
  setDistantDictionaries: (
    dictionariesRecord: Record<Dictionary['key'], Dictionary>
  ) => void;
  setLocaleDictionaries: (
    dictionariesRecord: Record<Dictionary['key'], Dictionary>
  ) => void;
};

const DictionariesRecordStatesContext = createContext<
  DictionariesRecordStatesContextType | undefined
>(undefined);
const DictionariesRecordActionsContext = createContext<
  DictionariesRecordActionsContextType | undefined
>(undefined);

export const DictionariesRecordProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [localeDictionaries, setLocaleDictionaries] =
    useCrossFrameState<DictionaryContent>(
      'INTLAYER_LOCALE_DICTIONARIES_CHANGED',
      {}
    );
  const [distantDictionaries, setDistantDictionaries] =
    useCrossFrameState<DictionaryContent>(
      'INTLAYER_DISTANT_DICTIONARIES_CHANGED',
      {}
    );

  return (
    <DictionariesRecordStatesContext.Provider
      value={{ localeDictionaries, distantDictionaries }}
    >
      <DictionariesRecordActionsContext.Provider
        value={{
          setLocaleDictionaries,
          setDistantDictionaries,
        }}
      >
        {children}
      </DictionariesRecordActionsContext.Provider>
    </DictionariesRecordStatesContext.Provider>
  );
};

export const useDictionariesRecordActions = () => {
  const context = useContext(DictionariesRecordActionsContext);

  if (!context) {
    throw new Error(
      'useDictionariesRecordActions must be used within a DictionariesRecordActionsProvider'
    );
  }
  return context;
};

export const useDictionariesRecord = () => {
  const actionsContext = useDictionariesRecordActions();
  const statesContext = useContext(DictionariesRecordStatesContext);

  if (!statesContext) {
    throw new Error(
      'useDictionariesRecordStates must be used within a DictionariesRecordStatesProvider'
    );
  }

  return { ...statesContext, ...actionsContext };
};
