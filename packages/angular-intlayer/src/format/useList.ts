import { computed, inject } from '@angular/core';
import { list } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

export const useList = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(
    () =>
      (...args: Parameters<typeof list>) =>
        list(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? intlayer.locale(),
        })
  );
};
