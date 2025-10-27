import { effect, inject } from '@angular/core';
import { MessageKey } from '@intlayer/editor';
import type { Locale, LocalesValues } from '@intlayer/types';
import { INTLAYER_TOKEN, type IntlayerProvider } from '../client';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export const useEditorLocale = createSharedComposable(() => {
  const client = inject<IntlayerProvider>(INTLAYER_TOKEN);

  if (!client) {
    throw new Error('IntlayerEditor state not found');
  }

  const [_data, setData] = useCrossFrameState<LocalesValues>(
    MessageKey.INTLAYER_CURRENT_LOCALE
  );

  // Use Angular effects instead of Vue watchers
  effect(() => {
    const newValue = client.locale();
    setData(newValue as Locale);
  });

  return client;
});
