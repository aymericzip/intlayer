import type { DictionaryContent } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useEffect, useState } from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

export type { DictionaryContent };

export const useDictionariesRecord = () => {
  const manager = useEditorStateManager();
  const [localeDictionaries, setLocaleDictionariesState] =
    useState<DictionaryContent>(manager?.localeDictionaries.value ?? {});

  useEffect(() => {
    if (!manager) return;

    const handler = (e: Event) =>
      setLocaleDictionariesState(
        (e as CustomEvent<DictionaryContent>).detail ?? {}
      );
    manager.localeDictionaries.addEventListener('change', handler);
    return () =>
      manager.localeDictionaries.removeEventListener('change', handler);
  }, [manager]);

  return {
    localeDictionaries,
    setLocaleDictionaries: (value: DictionaryContent) =>
      manager?.localeDictionaries.set(value),
    setLocaleDictionary: (dictionary: Dictionary) =>
      manager?.setLocaleDictionary(dictionary),
  };
};

export const useDictionariesRecordActions = () => {
  const { setLocaleDictionaries, setLocaleDictionary } =
    useDictionariesRecord();
  return { setLocaleDictionaries, setLocaleDictionary };
};
