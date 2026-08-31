import { getCanonicalPath, type LocalesValues } from 'intlayer';

/** Section a splat route serves, and the first slug of every page under it. */
export type ContentSection = 'doc' | 'blog' | 'frequent-questions';

/**
 * Resolves a splat route's `*` param to the slugs the content is keyed by.
 *
 * A locale may own a pretty alias for a page — `/fr/doc/sorties/v8` for
 * `/doc/releases/v8`, declared through `routing.rewrite` in
 * `intlayer.config.ts`. The address bar keeps the alias: it is the URL
 * `getLocalizedUrl` emits, the one submitted to search engines, and the one the
 * proxy redirects the canonical path to. So the alias is mapped back here
 * instead — in a loader, which runs on the server and on the client alike, and
 * in the server handlers serving the markdown of the same pages.
 *
 * Without it a page reached through its alias resolves to no content at all and
 * the route redirects the visitor away, to the section index or to the home
 * page.
 *
 * @param section - The section owning the route, prepended to every lookup.
 * @param splat - The route's `*` param, e.g. `sorties/v8`.
 * @param locale - The locale the URL belongs to.
 * @returns The canonical slugs below the section, e.g. `['releases', 'v8']`.
 *
 * @example
 * ```ts
 * getCanonicalSlugs('doc', 'sorties/v8', 'fr'); // ['releases', 'v8']
 * getCanonicalSlugs('doc', 'get-started', 'fr'); // ['get-started'] (no rule)
 * ```
 */
export const getCanonicalSlugs = (
  section: ContentSection,
  splat: string,
  locale: LocalesValues
): string[] => {
  const sectionPrefix = `/${section}/`;
  const canonicalPath = getCanonicalPath(`${sectionPrefix}${splat}`, locale);

  return (
    canonicalPath.startsWith(sectionPrefix)
      ? canonicalPath.slice(sectionPrefix.length)
      : canonicalPath
  )
    .split('/')
    .filter(Boolean);
};
