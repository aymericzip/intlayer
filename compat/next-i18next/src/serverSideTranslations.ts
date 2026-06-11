import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';

/**
 * Drop-in replacement for next-i18next's `serverSideTranslations`.
 *
 * In next-i18next this function loads translation JSON files and injects
 * them as `_nextI18Next` props so `useTranslation` can hydrate on the client.
 *
 * With Intlayer all dictionaries are compiled at build time so no runtime
 * loading is needed. This function returns the minimal shape expected by
 * `appWithTranslation` / `useTranslation` for drop-in compatibility.
 *
 * @deprecated serverSideTranslations has no use case with intlayer.
 * Dictionaries are compiled at build time and loaded automatically.
 *
 * @param locale - The active locale (e.g. from `getStaticProps` context).
 * @param namespacesRequired - Namespace list; recorded but not loaded.
 * @param configOverride - Config override; recorded but not applied.
 *
 * @example
 * ```ts
 * export const getStaticProps = async ({ locale }) => ({
 *   props: {
 *     ...(await serverSideTranslations(locale, ['common'])),
 *   },
 * });
 * ```
 */
export const serverSideTranslations = async (
  locale: string,
  namespacesRequired?: string[],
  configOverride?: Record<string, unknown>
): Promise<{ _nextI18Next: Record<string, unknown> }> => {
  if (process.env.NODE_ENV === 'development') {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('serverSideTranslations', CYAN)} has no use case with intlayer. Dictionaries are compiled at build time and loaded automatically under the hood.`
    );
  }

  return {
    _nextI18Next: {
      initialLocale: locale,
      initialI18nStore: {},
      ns: namespacesRequired ?? ['common'],
      userConfig: configOverride ?? null,
    },
  };
};
