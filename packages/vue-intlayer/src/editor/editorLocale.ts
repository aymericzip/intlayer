import { MessageKey } from '@intlayer/editor';
import type { Locales } from '@intlayer/types';
import { inject, watch } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from '../client';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

export const useEditorLocale = createSharedComposable(() => {
  const client = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  if (!client) {
    throw new Error('IntlayerEditor state not found');
  }

  const [_data, setData] = useCrossFrameState<Locales>(
    MessageKey.INTLAYER_CURRENT_LOCALE
  );

  watch(
    client.locale,
    (newValue) => {
      setData(newValue);
    },
    { immediate: true }
  );

  return client;
});
