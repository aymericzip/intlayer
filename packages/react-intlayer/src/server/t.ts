import type { Locales } from '@intlayer/config/client';
import type { LanguageContent } from '@intlayer/core';
import { getTranslation } from '../getTranslation';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the service side, this function returns the translation of the provided multilang content.
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const t = <Content = string>(
  multilangContent: LanguageContent<Content>,
  locale?: Locales
) => {
  const currentLocale = getServerContext<Locales>(IntlayerServerContext);
  const localeTarget = locale ?? currentLocale;

  return getTranslation<Content>(multilangContent, localeTarget);
};
