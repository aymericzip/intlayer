import { internationalization } from '@intlayer/config/built';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

export type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};

const { defaultLocale, locales: availableLocales } = internationalization ?? {};

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useLocale = (): UseLocaleResult => {
  const locale = (getServerContext(IntlayerServerContext) ??
    defaultLocale) as DeclaredLocales;

  return { locale, defaultLocale, availableLocales };
};
