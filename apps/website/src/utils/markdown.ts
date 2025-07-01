import { DocMetadata } from '@intlayer/docs';
import { getIntlayer, getLocalizedUrl, Locales } from 'intlayer';
import { defaultLocale, locales } from '../../intlayer.config';

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param string - The string to escape.
 * @returns The escaped string.
 */
const escapeRegExp = (string: string): string =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

/**
 * Remove the domain (protocol + host) part of a URL, returning only its pathname.
 * If the provided string is already a relative path, it is returned unchanged.
 */
const stripDomain = (url: string): string =>
  url.replace(/^https?:\/\/[^/]+/, '');

/**
 * This map converts *any* URL (GitHub or in-site) that targets a **non default**
 * locale to the equivalent default-locale route (usually English).
 * The same mapping is stored twice, once with the full absolute URL and once
 * without the domain so that links written as absolute or relative both match.
 */
const toDefaultLocaleUrlRenamer: Record<string, string> = locales.reduce(
  (acc, locale) => {
    const docMetadata = getIntlayer('doc-metadata', locale) as DocMetadata[];
    const blogMetadata = getIntlayer('blog-metadata', locale) as DocMetadata[];

    const aggregate = (data: DocMetadata[]) => {
      data.forEach((meta) => {
        const expectedPath = getLocalizedUrl(meta.relativeUrl, defaultLocale);

        // 1. GitHub URLs ------------------------------------------------------------------
        const githubDefault = meta.githubUrl;
        const githubEnglish = githubDefault.replace(
          `/${locale}/`,
          `/${defaultLocale}/`
        );

        // Add both domain and domain-less variants
        [githubDefault, githubEnglish].forEach((url) => {
          acc[url] = expectedPath;
          acc[stripDomain(url)] = expectedPath;
        });

        // 2. In-site localized URLs -------------------------------------------------------
        const localizedDomain = getLocalizedUrl(meta.url, locale); // contains domain
        const localizedPath = getLocalizedUrl(meta.relativeUrl, locale); // path only

        [localizedDomain, localizedPath].forEach((url) => {
          acc[url] = expectedPath;
        });
      });
    };

    aggregate(docMetadata);
    aggregate(blogMetadata);

    return acc;
  },
  {} as Record<string, string>
);

/**
 * For *each* locale we keep its own map that converts a default-locale route
 * to the equivalent localized route. As with the default map, each key is
 * stored in both absolute and relative variants so that any authoring style is
 * supported.
 */
const toFinalLocaleUrlRenamerByLocale: Record<
  Locales,
  Record<string, string>
> = locales.reduce(
  (outerAcc, locale) => {
    const docMetadata = getIntlayer('doc-metadata', locale) as DocMetadata[];
    const blogMetadata = getIntlayer('blog-metadata', locale) as DocMetadata[];

    const innerAcc: Record<string, string> = {};

    const aggregate = (data: DocMetadata[]) => {
      data.forEach((meta) => {
        const defaultDomain = getLocalizedUrl(meta.url, defaultLocale);
        const defaultPath = getLocalizedUrl(meta.relativeUrl, defaultLocale);

        const localizedPath = getLocalizedUrl(meta.relativeUrl, locale);

        [defaultDomain, defaultPath].forEach((key) => {
          innerAcc[key] = localizedPath;
        });
      });
    };

    aggregate(docMetadata);
    aggregate(blogMetadata);

    outerAcc[locale] = innerAcc;
    return outerAcc;
  },
  {} as Record<Locales, Record<string, string>>
);

// Because every locale shares the same *keys* (default-locale URLs), we can
// build a single regular expression out of any of the locale maps. The choice
// of the first one is arbitrary.
const finalUrlPattern = new RegExp(
  Object.keys(toFinalLocaleUrlRenamerByLocale[defaultLocale])
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|'),
  'g'
);

/**
 * Replaces URLs in the input text that match the application's domain
 * and do not have a file extension with their path only.
 *
 * @param text - The input text containing URLs to be processed.
 * @returns - The processed text with applicable URLs renamed.
 */
const removeURLDomain = (text: string): string => {
  // Retrieve the application domain from environment variables

  // Escape special regex characters in the domain to prevent regex injection
  const escapedDomain = process.env.NEXT_PUBLIC_DOMAIN!.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );

  // Regular expression to match URLs:
  // - Starts with https:// followed by the escaped domain
  // - Followed by a path that does not end with a file extension
  const urlRegex = new RegExp(
    `https?://${escapedDomain}(\\/[^\\s./?#]+(?:\\/[^\\s./?#]+)*)`,
    'g'
  );

  // Replace matched URLs with their path only, ensuring no file extension
  return text.replace(urlRegex, (match, path) => {
    // Check if the path ends with a file extension (e.g., .png, .jpg)
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(path.split('/').pop());

    // If there's no extension, return the path; otherwise, keep the original URL
    return hasExtension ? match : path;
  });
};

// Pre-compute regex pattern for the default-locale replacements as well.
const defaultUrlPattern = new RegExp(
  Object.keys(toDefaultLocaleUrlRenamer)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|'),
  'g'
);

/**
 * Replaces GitHub or localized URLs in the provided content with their target
 * pages routes. The replacements are performed in a single pass thanks to
 * pre-computed regular expressions for optimal performance.
 *
 * @param content - Raw markdown or HTML content.
 * @returns Content with URLs rewritten to the correct locale-aware routes
 *          and stripped of the base domain.
 */
export const urlRenamer = (content: string, locale: Locales): string => {
  if (!content) return '';

  // First: convert any localized URLs (or GitHub links) to their default-locale
  // counterpart so that we have a consistent baseline.
  let rewritten = content.replace(defaultUrlPattern, (match) => {
    return toDefaultLocaleUrlRenamer[match] ?? match;
  });

  // Second: if the requested locale is **not** the default one, convert the
  // default-locale links to their localized equivalent.
  if (locale !== defaultLocale) {
    const renamer = toFinalLocaleUrlRenamerByLocale[locale] ?? {};
    rewritten = rewritten.replace(finalUrlPattern, (match) => {
      return renamer[match] ?? match;
    });
  }

  return removeURLDomain(rewritten);
};
