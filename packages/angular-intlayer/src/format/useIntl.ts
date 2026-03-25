import { computed, inject } from '@angular/core';
import { bindIntl, type WrappedIntl } from '@intlayer/core/formatters';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { INTLAYER_TOKEN } from '../client/installIntlayer';

/**
 * Angular composable that provides a locale-bound `Intl` object as a Signal.
 */
export const useIntl = (locale?: LocalesValues) => {
  const intlayer = inject(INTLAYER_TOKEN);

  return computed<WrappedIntl>(() => {
    const currentLocale = locale ?? intlayer.locale();

    return bindIntl(currentLocale);
  });
};
