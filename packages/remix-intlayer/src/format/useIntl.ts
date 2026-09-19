import { internationalization } from '@intlayer/config/built';
import { bindIntl, type WrappedIntl } from '@intlayer/core/utils';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getRequestLocale } from '../requestStorage';

const { defaultLocale } = internationalization;

/**
 * Remix hook that provides a locale-bound `Intl` object.
 *
 * It uses the request locale when running inside a request handler,
 * falling back to the configured default locale.
 */
export const useIntl = (
  locale?: LocalesValues
): {
  intl: WrappedIntl;
  subscribe: (callback: (intl: WrappedIntl) => void) => () => void;
} => {
  const currentLocale =
    locale ?? getRequestLocale() ?? (defaultLocale as DeclaredLocales);
  const intl = bindIntl(currentLocale);

  return {
    intl,
    subscribe: () => () => {},
  };
};
