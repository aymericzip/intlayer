import { urlMapper } from '@/Routes';
import { Locales } from 'intlayer';
import { locales } from '../../intlayer.config';

const getDocLocale = (url: string, locale: Locales): string =>
  url.replace('/en/', `/${locale}/`);

const urlRenamerMultiLocale: Record<string, string> = locales.reduce(
  (acc, locale) =>
    Object.entries(urlMapper).reduce((acc, [githubRoute, pagesRoute]) => {
      const githubUrl = getDocLocale(githubRoute, locale);

      if (locale === Locales.ENGLISH) {
        acc[githubUrl] = pagesRoute;
      } else {
        acc[githubUrl] = `/${locale}${pagesRoute}`;
      }
      return acc;
    }, acc),
  {} as Record<string, string>
);

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @param string - The string to escape.
 * @returns The escaped string.
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

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

/**
 * Replaces GitHub URLs in the content with corresponding PagesRoutes.
 *
 * @param content - The input string content containing GitHub URLs.
 * @returns The updated content with URLs replaced.
 */
export const urlRenamer = (content: string): string => {
  let updatedContent = content ?? '';

  // Sort the entries by URL length in descending order to prevent partial replacements
  const sortedEntries = Object.entries(urlRenamerMultiLocale);

  sortedEntries.forEach(([githubUrl, pagesRoute]) => {
    const regex = new RegExp(escapeRegExp(githubUrl), 'g');

    updatedContent = updatedContent.replace(regex, pagesRoute);
  });

  // Remove the base domain from URLs
  updatedContent = removeURLDomain(updatedContent);

  return updatedContent;
};
