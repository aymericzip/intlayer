import configuration from '@intlayer/config/built';
import type { DeclaredLocales } from '@intlayer/types';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useLocale = (): UseLocaleResult => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  const locale = (getServerContext(IntlayerServerContext) ??
    defaultLocale) as DeclaredLocales;

  return { locale, defaultLocale, availableLocales };
};
