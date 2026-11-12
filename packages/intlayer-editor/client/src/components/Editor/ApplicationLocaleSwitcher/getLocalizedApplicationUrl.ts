import { getLocalizedUrl } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * URL of the application page `path` in `locale`, resolved with the
 * application routing configuration (not the editor's own built config).
 * Returns `null` when the routing keeps the locale out of the URL.
 */
export const getLocalizedApplicationUrl = (
  applicationURL: string,
  path: string,
  locale: Locale,
  configuration: Pick<IntlayerConfig, 'internationalization' | 'routing'>
): string | null => {
  const { internationalization, routing } = configuration;
  const hasDomainRouting = Object.keys(routing?.domains ?? {}).length > 0;

  if (routing?.mode === 'no-prefix' && !hasDomainRouting) return null;

  const applicationPageUrl = new URL(path, applicationURL).href;

  return getLocalizedUrl(applicationPageUrl, locale, {
    locales: internationalization.locales,
    defaultLocale: internationalization.defaultLocale,
    mode: routing?.mode,
    rewrite: routing?.rewrite,
    domains: routing?.domains,
  });
};
