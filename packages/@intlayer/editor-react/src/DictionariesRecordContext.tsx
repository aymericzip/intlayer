'use client';

import type { DictionaryContent } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useCallback, useEffect, useState } from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type { DictionaryContent } from '@intlayer/editor';

type DictionariesRecordStatesContextType = {
  localeDictionaries: DictionaryContent;
};
type DictionariesRecordActionsContextType = {
  setLocaleDictionaries: (value: DictionaryContent) => void;
  setLocaleDictionary: (dictionary: Dictionary) => void;
};

/**
 * Returns dictionaries record state and setters, backed by EditorStateManager.
 * Replaces the old DictionariesRecordContext + DictionariesRecordProvider.
 */
export const useDictionariesRecord = (): DictionariesRecordStatesContextType &
  DictionariesRecordActionsContextType => {
  const manager = useEditorStateManager();
  const [localeDictionaries, setLocaleDictionariesState] =
    useState<DictionaryContent>(manager.localeDictionaries.value ?? {});

  useEffect(() => {
    const handler = (e: Event) =>
      setLocaleDictionariesState(
        (e as CustomEvent<DictionaryContent>).detail ?? {}
      );
    manager.localeDictionaries.addEventListener('change', handler);
    return () =>
      manager.localeDictionaries.removeEventListener('change', handler);
  }, [manager]);

  const setLocaleDictionaries = useCallback(
    (value: DictionaryContent) => manager.localeDictionaries.set(value),
    [manager]
  );

  const setLocaleDictionary = useCallback(
    (dictionary: Dictionary) => manager.setLocaleDictionary(dictionary),
    [manager]
  );

  return { localeDictionaries, setLocaleDictionaries, setLocaleDictionary };
};

export const useDictionariesRecordActions =
  (): DictionariesRecordActionsContextType => {
    const { setLocaleDictionaries, setLocaleDictionary } =
      useDictionariesRecord();
    return { setLocaleDictionaries, setLocaleDictionary };
  };
