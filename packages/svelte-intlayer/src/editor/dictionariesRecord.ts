import type { DictionaryContent } from '@intlayer/editor';
import { readable } from 'svelte/store';
import { getEditorStateManager } from './communicator';

export type { DictionaryContent };

export const useDictionariesRecord = () => {
  const manager = getEditorStateManager();

  const dictionariesRecord = readable<DictionaryContent>(
    manager.localeDictionaries.value ?? {},
    (set) => {
      const handler = (e: Event) =>
        set((e as CustomEvent<DictionaryContent>).detail ?? {});
      manager.localeDictionaries.addEventListener('change', handler);
      return () =>
        manager.localeDictionaries.removeEventListener('change', handler);
    }
  );

  return { dictionariesRecord };
};
