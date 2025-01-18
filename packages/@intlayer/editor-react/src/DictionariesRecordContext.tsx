import { type Dictionary } from '@intlayer/core';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { useCrossFrameState } from './useCrossFrameState';

// Types for our state
export type DictionaryContent = Record<Dictionary['key'], Dictionary>;

type DictionariesRecordContextType = {
  dictionariesRecord: DictionaryContent;
  setDictionariesRecord: (
    dictionariesRecord: Record<Dictionary['key'], Dictionary>
  ) => void;
};

const DictionariesRecordContext = createContext<
  DictionariesRecordContextType | undefined
>(undefined);

export const DictionariesRecordProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [dictionariesRecord, setDictionariesRecordState] =
    useCrossFrameState<DictionaryContent>('DICTIONARIES_RECORD_CHANGED', {});

  const setDictionariesRecord = (newRecord: DictionaryContent) => {
    // Here we merge the new record with the existing one:
    setDictionariesRecordState((prev) => ({
      ...prev,
      ...newRecord,
    }));
  };

  return (
    <DictionariesRecordContext.Provider
      value={{ dictionariesRecord, setDictionariesRecord }}
    >
      {children}
    </DictionariesRecordContext.Provider>
  );
};

export const useDictionariesRecord = () => {
  const context = useContext(DictionariesRecordContext);

  if (!context) {
    throw new Error(
      'useDictionariesRecord must be used within a DictionariesRecordProvider'
    );
  }
  return context;
};
