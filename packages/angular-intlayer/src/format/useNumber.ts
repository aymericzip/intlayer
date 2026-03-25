import { computed, inject } from '@angular/core';
import { number } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

/**
 * Angular client hook that provides a localized number formatter.
 */
export const useNumber = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(
    () =>
      (...args: Parameters<typeof number>) =>
        number(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? intlayer.locale(),
        })
  );
};
