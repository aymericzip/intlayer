import { internationalization } from '@intlayer/config/built';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { getIntlayerState } from './requestStorage';

export type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};

const { defaultLocale, locales: availableLocales } = internationalization;

/**
 * Returns the locale of the request being handled, with the configured
 * default and available locales.
 *
 * Falls back to the default locale outside of a request, i.e. when the
 * `intlayer()` middleware did not run.
 *
 * @example
 * ```ts
 * router.get('/', () => {
 *   const { locale, availableLocales } = useLocale();
 *   return Response.json({ locale, availableLocales });
 * });
 * ```
 */
export const useLocale = (): UseLocaleResult => {
  const state = getIntlayerState();

  return {
    locale: state?.locale ?? (defaultLocale as DeclaredLocales),
    defaultLocale: state?.defaultLocale ?? (defaultLocale as DeclaredLocales),
    availableLocales:
      state?.availableLocales ?? (availableLocales as DeclaredLocales[]),
  };
};
