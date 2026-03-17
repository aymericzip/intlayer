import { effect, inject } from '@angular/core';
import type { Locale } from '@intlayer/types/allLocales';
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
      manager.currentLocale.set(locale as Locale);
    });
  }

  return client;
};
