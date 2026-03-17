import type { IntlayerConfig } from '@intlayer/types/config';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useConfiguration = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const config = ref<IntlayerConfig | undefined>(manager?.configuration.value);

  const handler = (e: Event) => {
    config.value = (e as CustomEvent<IntlayerConfig>).detail;
  };

  onMounted(() => {
    manager?.configuration.addEventListener('change', handler);
  });

  onBeforeUnmount(() => {
    manager?.configuration.removeEventListener('change', handler);
  });

  return config;
};
