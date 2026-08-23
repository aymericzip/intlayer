import { internationalization } from '@intlayer/config/built';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { resolveAmbientLocale } from './ambientLocale';

export type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};

/**
 * On the server side, hook returning the current locale along with the default
 * and available ones.
 *
 * Reimplemented rather than re-exported from `react-intlayer/server`: that one
 * takes no locale argument, so there is no way to hand it the ambient locale —
 * it would read the server context alone and report the default locale on any
 * render the provider did not reach.
 */
export const useLocale = (): UseLocaleResult => {
  const { defaultLocale, locales: availableLocales } =
    internationalization ?? {};

  const locale = (resolveAmbientLocale() ?? defaultLocale) as DeclaredLocales;

  return { locale, defaultLocale, availableLocales };
};
