import { computed, inject } from '@angular/core';
import { relativeTime } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

export const useRelativeTime = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(
    () =>
      (...args: Parameters<typeof relativeTime>) =>
        relativeTime(args[0], args[1], {
          ...args[2],
          locale: args[2]?.locale ?? intlayer.locale(),
        })
  );
};
