import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/types';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useLocale = () => {
  const { defaultLocale } = configuration?.internationalization ?? {};
  const locale =
    (getServerContext<LocalesValues>(IntlayerServerContext) as Locales) ??
    (defaultLocale as Locales);

  return { locale };
};
