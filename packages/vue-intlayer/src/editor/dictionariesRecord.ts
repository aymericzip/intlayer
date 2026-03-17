import type { DictionaryContent } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { inject, onBeforeUnmount, onMounted, readonly, ref } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export type { DictionaryContent };

export const useDictionariesRecord = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const localeDictionariesRef = ref<DictionaryContent>(
    manager?.localeDictionaries.value ?? {}
  );

  const handler = (e: Event) => {
    localeDictionariesRef.value =
      (e as CustomEvent<DictionaryContent>).detail ?? {};
  };

  onMounted(() => {
    manager?.localeDictionaries.addEventListener('change', handler);
  });

  onBeforeUnmount(() => {
    manager?.localeDictionaries.removeEventListener('change', handler);
  });

  return {
    localeDictionaries: readonly(localeDictionariesRef),
    setLocaleDictionaries: (value: DictionaryContent) =>
      manager?.localeDictionaries.set(value),
    setLocaleDictionary: (dictionary: Dictionary) =>
      manager?.setLocaleDictionary(dictionary),
  };
};
