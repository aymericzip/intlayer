import { computed, inject } from '@angular/core';
import { currency } from '@intlayer/core/formatters';
import { IntlayerProvider } from '../client/installIntlayer';

export const useCurrency = () => {
  const intlayer = inject(IntlayerProvider);

  return computed(
    () =>
      (...args: Parameters<typeof currency>) =>
        currency(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? intlayer.locale(),
        })
  );
};
