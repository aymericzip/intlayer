import type { getInternalPath as UpstreamGetInternalPath } from 'next-i18next';
import { resolvePathConfig, translatePath } from './pathnames';

/** Recover the language and internal route from a public pathname. */
export const getInternalPath: typeof UpstreamGetInternalPath = (
  pathname,
  configuration
) => {
  const config = resolvePathConfig(configuration);
  const path =
    config.basePath &&
    (pathname === config.basePath || pathname.startsWith(`${config.basePath}/`))
      ? pathname.slice(config.basePath.length) || '/'
      : pathname;
  const segment = path.match(/^\/([^/]+)/)?.[1];

  let language =
    segment &&
    config.supportedLanguages.find(
      (locale) => locale.toLowerCase() === segment.toLowerCase()
    );
  let rest = path;

  if (language) rest = path.slice(segment!.length + 1) || '/';
  else if (config.hideDefaultLocale) language = config.fallbackLanguage;
  if (!language) return { path };

  return {
    lng: language,
    path: translatePath(
      rest,
      language,
      config.localeInPath === true ? config.pathnames : undefined,
      'internal'
    ),
  };
};
