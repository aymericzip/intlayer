import type { DocMetadata } from '@intlayer/docs';
import {
  getIntlayer,
  getLocalizedUrl,
  type LocalesValues,
  localeMap,
} from 'intlayer';

export const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}[\]\\]/g, '\\$&');

export const formatRegExp = (str: string): RegExp =>
  new RegExp(escapeRegExp(str), 'g');

type URLMap = {
  urlRegexToReplace: RegExp;
  urlToReplaceWith: string;
};

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

  let output = content;
  for (const { urlRegexToReplace, urlToReplaceWith } of urlMap) {
    output = output.replace(urlRegexToReplace, urlToReplaceWith);
  }

  return output;
};
