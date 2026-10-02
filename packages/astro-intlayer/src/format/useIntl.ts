import { bindIntl, type WrappedIntl } from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getRequestLocale } from '../requestStorage';

/**
 * Astro hook that provides a locale-bound `Intl` object.
 *
 * It uses the request locale on the server, falling back to the stored
 * locale in the browser, then to the default locale.
 */
export const useIntl = (
  locale?: LocalesValues
): {
  intl: WrappedIntl;
  subscribe: (callback: (intl: WrappedIntl) => void) => () => void;
} => {
  const currentLocale = locale ?? getRequestLocale();
  const intl = bindIntl(currentLocale);

  return {
    intl,
    subscribe: () => () => {},
  };
};
