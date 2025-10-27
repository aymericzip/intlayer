'use client';

import { MessageKey } from '@intlayer/editor';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { useCrossFrameState } from './useCrossFrameState';

export type DictionaryContent = Record<LocalDictionaryId, Dictionary>;

type DictionariesRecordStatesContextType = {
  localeDictionaries: DictionaryContent;
};
type DictionariesRecordActionsContextType = {
  setLocaleDictionaries: Dispatch<SetStateAction<DictionaryContent>>;
  setLocaleDictionary: (dictionary: Dictionary) => void;
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
      MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
      undefined
    );

  const stateValue = useMemo(
    () => ({
      localeDictionaries: localeDictionaries ?? {},
    }),
    [localeDictionaries]
  );

  const actionValue = useMemo(
    () => ({
      setLocaleDictionaries,
      setLocaleDictionary: (dictionary: Dictionary) => {
        if (!dictionary.localId) return;

        setLocaleDictionaries((dictionaries) => ({
          ...dictionaries,
          [dictionary.localId as LocalDictionaryId]: dictionary,
        }));
      },
    }),
    [setLocaleDictionaries]
  );

  return (
    <DictionariesRecordStatesContext.Provider value={stateValue}>
      <DictionariesRecordActionsContext.Provider value={actionValue}>
        {children}
      </DictionariesRecordActionsContext.Provider>
    </DictionariesRecordStatesContext.Provider>
  );
};

export const useDictionariesRecordActions = () =>
  useContext(DictionariesRecordActionsContext);

export const useDictionariesRecord = () => {
  const actionsContext = useDictionariesRecordActions();
  const statesContext = useContext(DictionariesRecordStatesContext);

  if (!statesContext) {
    throw new Error(
      'useDictionariesRecordStates must be used within a DictionariesRecordProvider'
    );
  }

  return { ...statesContext, ...actionsContext };
};
