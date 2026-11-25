import type { I18nConfig, Pathnames } from 'next-i18next';

/** Resolve only the configuration used by the pure pathname helpers. */
export const resolvePathConfig = (configuration: I18nConfig) => {
  const supportedLanguages = configuration.supportedLngs ??
    configuration.i18n?.locales.filter((locale) => locale !== 'default') ?? [
      'en',
    ];
  const fallbackLanguage =
    configuration.fallbackLng ??
    configuration.i18n?.defaultLocale ??
    supportedLanguages[0];

  if (!fallbackLanguage) {
    throw new Error(
      'next-i18next: fallbackLng (or i18n.defaultLocale) is required'
    );
  }
  if (supportedLanguages.length === 0) {
    throw new Error(
      'next-i18next: supportedLngs (or i18n.locales) must contain at least one language'
    );
  }

  return {
    supportedLanguages,
    fallbackLanguage,
    localeInPath: configuration.localeInPath ?? true,
    hideDefaultLocale: configuration.hideDefaultLocale ?? false,
    basePath: configuration.basePath
      ? `/${configuration.basePath.replace(/^\/+|\/+$/g, '')}`
      : '',
    pathnames: configuration.pathnames,
  };
};

/** Match static routes before parameters and catch-all segments. */
const routePriority = (pattern: string): number =>
  pattern.includes('[...') ? 2 : pattern.includes('[') ? 1 : 0;

/** Translate a matching route, preserving named and catch-all parameters. */
export const translatePath = (
  path: string,
  language: string,
  pathnames: Pathnames | undefined,
  direction: 'internal' | 'localized'
): string => {
  if (!pathnames) return path;

  let decodedPath = path;
  try {
    decodedPath = decodeURI(path);
  } catch {
    // Malformed escapes remain literal, as they do upstream.
  }
  if (decodedPath.length > 1) decodedPath = decodedPath.replace(/\/$/, '');

  const routes = Object.keys(pathnames).sort(
    (first, second) => routePriority(first) - routePriority(second)
  );
  for (const internal of routes) {
    const localized = pathnames[internal]?.[language];
    if (!localized) continue;

    const source = direction === 'localized' ? internal : localized;
    const target = direction === 'localized' ? localized : internal;
    const parameterNames: string[] = [];
    const expression = source
      .split(/(\[\.\.\.[^\]]+\]|\[[^\]]+\])/)
      .map((segment) => {
        const parameter = segment.match(/^\[(\.\.\.)?([^\]]+)\]$/);

        if (!parameter) return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        parameterNames.push(parameter[2]!);
        return parameter[1] ? '(.+)' : '([^/]+)';
      })
      .join('');
    const match = decodedPath.match(new RegExp(`^${expression}$`));
    if (!match) continue;

    const parameters = Object.fromEntries(
      parameterNames.map((name, index) => [name, match[index + 1]])
    );

    return target.replace(
      /\[(?:\.\.\.)?([^\]]+)\]/g,
      (_match, name: string) => parameters[name] ?? ''
    );
  }
  return path;
};
