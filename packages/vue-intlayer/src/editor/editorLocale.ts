import { MessageKey } from '@intlayer/types/messageKey';
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
        manager?.messenger.send(
          `${MessageKey.INTLAYER_CURRENT_LOCALE}/post`,
          newLocale
        );
      },
      { immediate: true }
    );
  }

  return client;
};
