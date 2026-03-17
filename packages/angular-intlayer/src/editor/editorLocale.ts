import { effect, inject } from '@angular/core';
import { MessageKey } from '@intlayer/types/messageKey';
import { INTLAYER_TOKEN, type IntlayerProvider } from '../client';
import { getEditorStateManager } from './installIntlayerEditor';

export const useEditorLocale = () => {
  const manager = getEditorStateManager();
  const client = inject<IntlayerProvider>(INTLAYER_TOKEN, {
    optional: true,
  } as any);

  if (client && manager) {
    effect(() => {
      const locale = client.locale();
      manager.messenger.send(
        `${MessageKey.INTLAYER_CURRENT_LOCALE}/post`,
        locale
      );
    });
  }

  return client;
};
