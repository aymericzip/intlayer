import { computed, inject } from '@angular/core';
import { units } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

export const useUnit = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(
    () =>
      (...args: Parameters<typeof units>) =>
        units(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? intlayer.locale(),
        })
  );
};
