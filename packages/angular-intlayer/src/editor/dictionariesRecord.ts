import { DestroyRef, inject, signal } from '@angular/core';
import type { DictionaryContent } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { getEditorStateManager } from './installIntlayerEditor';

export type { DictionaryContent };

export const useDictionariesRecord = () => {
  const manager = getEditorStateManager();
  const localeDictionaries = signal<DictionaryContent>(
    manager?.localeDictionaries.value ?? {}
  );

  if (manager) {
    const handler = (e: Event) =>
      localeDictionaries.set(
        (e as CustomEvent<DictionaryContent>).detail ?? {}
      );
    manager.localeDictionaries.addEventListener('change', handler);

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(() =>
        manager.localeDictionaries.removeEventListener('change', handler)
      );
    } catch {}
  }

  return {
    localeDictionaries: localeDictionaries.asReadonly(),
    setLocaleDictionaries: (value: DictionaryContent) =>
      manager?.localeDictionaries.set(value),
    setLocaleDictionary: (dictionary: Dictionary) =>
      manager?.setLocaleDictionary(dictionary),
  };
};
