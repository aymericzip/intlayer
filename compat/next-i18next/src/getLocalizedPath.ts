import type { getLocalizedPath as UpstreamGetLocalizedPath } from 'next-i18next';
import { resolvePathConfig, translatePath } from './pathnames';

/** Public route with its configured base path and locale prefix. */
export const getLocalizedPath: typeof UpstreamGetLocalizedPath = (
  path,
  language,
  configuration
) => {
  const config = resolvePathConfig(configuration);
  const localizedPath = translatePath(
    path,
    language,
    config.localeInPath === true ? config.pathnames : undefined,
    'localized'
  );

  if (
    config.localeInPath !== true ||
    (config.hideDefaultLocale && language === config.fallbackLanguage)
  ) {
    return config.basePath && localizedPath === '/'
      ? config.basePath
      : `${config.basePath}${localizedPath}`;
  }

  return `${config.basePath}/${language}${localizedPath === '/' ? '' : localizedPath}`;
};
