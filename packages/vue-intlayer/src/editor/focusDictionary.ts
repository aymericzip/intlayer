import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { inject, onBeforeUnmount, onMounted, readonly, ref } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export type { FileContent };

export const useFocusDictionary = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const focusedContentRef = ref<FileContent | null>(
    manager?.focusedContent.value ?? null
  );

  const handler = (e: Event) => {
    focusedContentRef.value = (e as CustomEvent<FileContent | null>).detail;
  };

  onMounted(() => {
    manager?.focusedContent.addEventListener('change', handler);
  });

  onBeforeUnmount(() => {
    manager?.focusedContent.removeEventListener('change', handler);
  });

  return {
    focusedContent: readonly(focusedContentRef),
    setFocusedContent: (value: FileContent | null) =>
      manager?.focusedContent.set(value),
    setFocusedContentKeyPath: (keyPath: KeyPath[]) =>
      manager?.setFocusedContentKeyPath(keyPath),
  };
};
