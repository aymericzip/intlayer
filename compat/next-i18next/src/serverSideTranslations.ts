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
  configOverride?: Record<string, any>
): Promise<{ _nextI18Next: Record<string, any> }> => ({
  _nextI18Next: {
    initialLocale: locale,
    initialI18nStore: {},
    ns: namespacesRequired ?? ['common'],
    userConfig: configOverride ?? null,
  },
});
