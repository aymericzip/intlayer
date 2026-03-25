import { computed, inject } from '@angular/core';
import { compact } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

export const useCompact = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(
    () =>
      (...args: Parameters<typeof compact>) =>
        compact(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? intlayer.locale(),
        })
  );
};
