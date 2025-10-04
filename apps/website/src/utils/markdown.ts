import type { DocMetadata } from '@intlayer/docs';
import {
  getIntlayer,
  getLocalizedUrl,
  type LocalesValues,
  localeMap,
} from 'intlayer';

// ---------------------------------------------------------------------------
// Build a set of regexp–replacement pairs. Each regexp is created once so
// that the transformation can be executed in a single pass afterwards.
// ---------------------------------------------------------------------------

export const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}[\]\\]/g, '\\$&'); // Escapes characters with special meaning in RegExp.

export const formatRegExp = (str: string): RegExp =>
  new RegExp(escapeRegExp(str), 'g'); // Escapes characters with special meaning in RegExp.

type URLMap = {
  urlRegexToReplace: RegExp;
  urlToReplaceWith: string;
};

/**
 * Replaces GitHub or localized URLs in the provided content with their target
 * pages routes. The replacements are performed in a single pass thanks to
 * pre-computed regular expressions for optimal performance.
 *
 * @param content - Raw markdown or HTML content.
 * @returns Content with URLs rewritten to the correct locale-aware routes
 *          and stripped of the base domain.
 */
export const urlRenamer = (
  content: string,
  pageLocale: LocalesValues
): string => {
  if (!content) return '';

  const urlMap: URLMap[] = [];
  const docMetadata = getIntlayer('doc-metadata', pageLocale) as DocMetadata[];
  const blogMetadata = getIntlayer(
    'blog-metadata',
    pageLocale
  ) as DocMetadata[];

  // en|fr|ru|ja|it|hi
  const localePattern = localeMap(({ locale }) => locale).join('|');

  const getGithubUrlRegex = (githubUrl: string) =>
    formatRegExp(githubUrl.replace('/en/', `/(${localePattern})/`));

  for (const meta of [...docMetadata, ...blogMetadata]) {
    const docGithubUrlMap: URLMap = {
      urlRegexToReplace: getGithubUrlRegex(meta.githubUrl),
      urlToReplaceWith: getLocalizedUrl(meta.relativeUrl, pageLocale),
    };

    urlMap.push(docGithubUrlMap);
  }

  // Execute all replacements sequentially. As every regexp is global (`g`),
  // each `replace` walks through the string only once.
  let output = content;
  for (const { urlRegexToReplace, urlToReplaceWith } of urlMap) {
    output = output.replace(urlRegexToReplace, urlToReplaceWith);
  }

  return output;
};
