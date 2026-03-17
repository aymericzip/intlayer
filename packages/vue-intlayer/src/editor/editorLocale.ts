import type { Locale } from '@intlayer/types/allLocales';
import { inject, watch } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from '../client';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useEditorLocale = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const client = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  if (client) {
    watch(
      client.locale,
      (newLocale) => {
        manager?.currentLocale.set(newLocale as Locale);
      },
      { immediate: true }
    );
  }

  return client;
};
