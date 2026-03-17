import type { DictionaryContent } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { createSignal, onCleanup } from 'solid-js';
import { useEditorStateManager } from './EditorProvider';

export type { DictionaryContent };

export const useDictionariesRecord = () => {
  const manager = useEditorStateManager();
  const [localeDictionaries, setLocaleDictionariesSignal] =
    createSignal<DictionaryContent>(manager?.localeDictionaries.value ?? {});

  if (manager) {
    const handler = (e: Event) =>
      setLocaleDictionariesSignal(
        (e as CustomEvent<DictionaryContent>).detail ?? {}
      );
    manager.localeDictionaries.addEventListener('change', handler);
    onCleanup(() =>
      manager.localeDictionaries.removeEventListener('change', handler)
    );
  }

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
