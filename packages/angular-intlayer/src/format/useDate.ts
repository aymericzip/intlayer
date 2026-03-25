import { computed, inject } from '@angular/core';
import { date, presets } from '@intlayer/core/formatters';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

/**
 * Angular client hook that provides a localized date/time formatter.
 */
export const useDate = () => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed(() => (...args: Parameters<typeof date>) => {
    const locale = intlayer.locale();
    const options =
      typeof args[1] === 'string'
        ? { ...presets[args[1]], locale }
        : { ...args[1], locale: args[1]?.locale ?? locale };

    return date(args[0], options as Parameters<typeof date>[1]);
  });
};
