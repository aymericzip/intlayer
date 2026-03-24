import { bindIntl, type WrappedIntl } from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * Get a locale-bound `Intl` object and subscribe to locale changes.
 *
 * The returned `intl` property acts like the native `Intl` namespace but
 * automatically uses the current application locale, so you do not need to
 * pass the locale manually to `NumberFormat`, `DateTimeFormat`, etc.
 *
 * @param locale - Optional locale override.
 * @returns An object with `intl: WrappedIntl` and a `subscribe` function.
 *
 * @example
 * ```ts
 * import { installIntlayer, useIntl } from 'vanilla-intlayer';
 *
 * installIntlayer('en');
 *
 * const { intl, subscribe } = useIntl();
 *
 * console.log(new intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(9.99));
 *
 * const unsubscribe = subscribe((newIntl) => {
 *   console.log(new newIntl.NumberFormat({ style: 'currency', currency: 'USD' }).format(9.99));
 * });
 * ```
 */
export const useIntl = (
  locale?: LocalesValues
): {
  intl: WrappedIntl;
  subscribe: (callback: (intl: WrappedIntl) => void) => () => void;
} => {
  const client = getIntlayerClient();
  const intl = bindIntl(locale ?? client.locale);

  return {
    intl,
    subscribe: (callback) =>
      client.subscribe((newLocale) => {
        callback(bindIntl(locale ?? newLocale));
      }),
  };
};
