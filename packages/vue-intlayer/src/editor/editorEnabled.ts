import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useEditorEnabled = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const enabled = ref<boolean>(manager?.editorEnabled.value ?? false);

  const handler = (e: Event) => {
    enabled.value = (e as CustomEvent<boolean>).detail;
  };

  onMounted(() => {
    manager?.editorEnabled.addEventListener('change', handler);
  });

  onBeforeUnmount(() => {
    manager?.editorEnabled.removeEventListener('change', handler);
  });

  return { enabled };
};
