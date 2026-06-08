import { computed, inject } from '@angular/core';
import { percentage } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

export const usePercentage = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(
    () =>
      (...args: Parameters<typeof percentage>) =>
        percentage(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? intlayer.locale(),
        })
  );
};
