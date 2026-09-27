import { ALL_LOCALES } from '@intlayer/types/allLocales';
import { byteLength, extractVisibleTextStrings } from './parseHtml';
import type {
  BundleChunkInput,
  BundleContentAnalysis,
  ChunkAnalysis,
} from './types';

/**
 * Detect and measure localized (i18n) content embedded in JavaScript bundles.
 *
 * This is a dependency-free port of the hosted backend bundle analyzer: it
 * estimates how many translation strings ship in each chunk and, of those, how
 * many belong to locales other than the one currently rendered (i.e. dead
 * weight that a build-time optimization could strip).
 */

const allLocaleValues = new Set(Object.values(ALL_LOCALES) as string[]);

const isLocaleCode = (key: string): boolean =>
  allLocaleValues.has(key) || /^[a-z]{2}(-[A-Z]{2,4})?$/.test(key);

/** Find the end index of the value following a `locale:` key. */
const extractValueEnd = (text: string, valueStart: number): number => {
  let cursor = valueStart;

  while (cursor < text.length && ' \t\n\r'.includes(text[cursor] ?? ''))
    cursor++;

  if (cursor >= text.length) return valueStart;

  const char = text[cursor];

  if (!char) return valueStart;

  if (char === '{' || char === '[') {
    const endChar = char === '{' ? '}' : ']';
    let depth = 1;
    cursor++;
    while (cursor < text.length && depth > 0) {
      const c = text[cursor];

      if (c === char) depth++;
      else if (c === endChar) depth--;
      else if (c === '"' || c === '`') {
        const quote = c;
        cursor++;
        while (cursor < text.length) {
          if (text[cursor] === '\\') {
            cursor += 2;
            continue;
          }

          if (text[cursor] === quote) break;
          cursor++;
        }
      }
      cursor++;
    }
    return cursor;
  }

  if (char === '"' || char === '`') {
    const quote = char;
    cursor++;
    while (cursor < text.length) {
      if (text[cursor] === '\\') {
        cursor += 2;
        continue;
      }

      if (text[cursor] === quote) {
        cursor++;
        break;
      }
      cursor++;
    }
    return cursor;
  }
  const endMatch = text.slice(cursor).search(/[,}\]\s]/);
  return endMatch === -1 ? text.length : cursor + endMatch;
};

// Matches both quoted ("en":) and unquoted (en:) locale keys followed by {
// Works for any i18n solution — intlayer, i18next, vue-i18n, FormatJS, etc.
const LOCALE_KEY_PATTERN =
  /(?:"([a-z]{2}(?:-[A-Z]{2,4})?)"|\b([a-z]{2}(?:-[A-Z]{2,4})?)\b)\s*:\s*(?=\{)/g;

// Maximum character gap between two locale key positions to consider them
// part of the same i18n object. Large enough for big translation objects.
const LOCALE_CLUSTER_WINDOW = 10_000;

// Returns false when a candidate value is clearly not i18n text:
// - contains hex/control escape sequences (ANSI codes, binary data)
const looksLikeI18nContent = (valueText: string): boolean => {
  if (/\\x[0-9a-fA-F]{2}/.test(valueText)) return false;

  if (/\\u00[01][0-9a-fA-F]/.test(valueText)) return false;
  return true;
};

type LocaleMatch = {
  locale: string;
  position: number;
  valueStart: number;
  valueEnd: number;
  valueSize: number;
};

const analyzeChunkLocaleContent = (
  text: string,
  baseCurrent: string
): {
  unusedLocaleSize: number;
  usedLocaleSize: number;
  dictionariesFound: number;
} => {
  // Step 1: collect all candidate locale key matches
  const candidates: LocaleMatch[] = [];
  const regex = new RegExp(LOCALE_KEY_PATTERN.source, 'g');
  let match = regex.exec(text);

  while (match !== null) {
    const locale = match[1] ?? match[2];

    if (locale && isLocaleCode(locale)) {
      const valueStart = match.index + match[0].length;
      const valueEnd = extractValueEnd(text, valueStart);
      const valueSize = valueEnd - valueStart;
      const valueText = text.slice(valueStart, valueEnd);

      if (valueSize >= 5 && looksLikeI18nContent(valueText)) {
        candidates.push({
          locale,
          position: match.index,
          valueStart,
          valueEnd,
          valueSize,
        });
      }
    }
    match = regex.exec(text);
  }

  // Step 2: a locale key is i18n content only if, within
  // LOCALE_CLUSTER_WINDOW chars, another locale key with a DIFFERENT language
  // exists AND the rendered locale is part of the cluster. The second rule
  // discards minified object keys that happen to be locale codes (`id:{`,
  // `as:{`, `to:{`…), which never come with the page locale next to them.
  const languageOf = (candidate: LocaleMatch): string =>
    (candidate.locale.split('-')[0] ?? '').toLowerCase();

  const isI18nMatch = (idx: number): boolean => {
    const currentCandidate = candidates[idx];

    if (!currentCandidate) return false;
    const base = languageOf(currentCandidate);
    let hasOtherLanguage = false;
    let hasCurrentLanguage = base === baseCurrent;
    for (let j = 0; j < candidates.length; j++) {
      if (j === idx) continue;
      const neighbor = candidates[j];

      if (!neighbor) continue;
      const dist = Math.abs(neighbor.position - currentCandidate.position);

      if (dist > LOCALE_CLUSTER_WINDOW) continue;
      const neighborLanguage = languageOf(neighbor);

      if (neighborLanguage !== base) hasOtherLanguage = true;

      if (neighborLanguage === baseCurrent) hasCurrentLanguage = true;

      if (hasOtherLanguage && hasCurrentLanguage) return true;
    }
    return false;
  };

  let unusedLocaleSize = 0;
  let usedLocaleSize = 0;
  let dictionariesFound = 0;

  for (let i = 0; i < candidates.length; i++) {
    if (!isI18nMatch(i)) continue;

    const candidate = candidates[i];

    if (!candidate) continue;
    const { locale, valueSize } = candidate;
    dictionariesFound++;

    if ((locale.split('-')[0] ?? '').toLowerCase() === baseCurrent) {
      usedLocaleSize += valueSize;
    } else {
      unusedLocaleSize += valueSize;
    }
  }

  return { unusedLocaleSize, usedLocaleSize, dictionariesFound };
};

/**
 * Analyze the locale weight of a page's JavaScript bundles.
 *
 * @param chunks - The fetched JavaScript chunks (main + lazy).
 * @param htmlContent - The page HTML, used to estimate rendered content size.
 * @param currentLocale - The locale currently rendered by the page.
 * @param totalPageSize - The total transferred bytes measured for the page.
 * @returns The aggregated {@link BundleContentAnalysis}.
 */
export const analyzeBundleContent = (
  chunks: BundleChunkInput[],
  htmlContent: string,
  currentLocale: string,
  totalPageSize: number
): BundleContentAnalysis => {
  const empty: BundleContentAnalysis = {
    currentLocale,
    totalPageSize,
    renderedContentSize: 0,
    contentSize: 0,
    totalLocaleSize: 0,
    totalUnusedLocaleSize: 0,
    unusedPercentOfLocale: 0,
    mainBundleChunks: [],
    lazyBundleChunks: [],
  };

  if (!chunks.length && !htmlContent) return empty;

  // Rendered content size from HTML visible text (deduplicated).
  const pageStrings = new Set(extractVisibleTextStrings(htmlContent));

  let renderedContentSize = 0;
  pageStrings.forEach((text) => {
    renderedContentSize += byteLength(text);
  });

  const baseCurrent = (currentLocale.split('-')[0] ?? '').toLowerCase();

  const mainBundleChunks: ChunkAnalysis[] = [];
  const lazyBundleChunks: ChunkAnalysis[] = [];

  for (const chunk of chunks) {
    const { unusedLocaleSize, usedLocaleSize, dictionariesFound } =
      analyzeChunkLocaleContent(chunk.content, baseCurrent);

    const totalLocaleSize = unusedLocaleSize + usedLocaleSize;
    const analysis: ChunkAnalysis = {
      url: chunk.url,
      fileSize: byteLength(chunk.content),
      totalLocaleSize,
      unusedLocaleSize,
      usedLocaleSize,
      dictionariesFound,
      unusedPercent:
        totalLocaleSize > 0
          ? Math.round((unusedLocaleSize / totalLocaleSize) * 100)
          : 0,
    };

    if (chunk.isMainBundle) {
      mainBundleChunks.push(analysis);
    } else if (dictionariesFound > 0) {
      lazyBundleChunks.push(analysis);
    }
  }

  const totalUnusedLocaleSize =
    mainBundleChunks.reduce((sum, c) => sum + c.unusedLocaleSize, 0) +
    lazyBundleChunks.reduce((sum, c) => sum + c.unusedLocaleSize, 0);
  const totalLocaleSize =
    mainBundleChunks.reduce((sum, c) => sum + c.totalLocaleSize, 0) +
    lazyBundleChunks.reduce((sum, c) => sum + c.totalLocaleSize, 0);
  const contentSize = renderedContentSize + totalLocaleSize;

  const unusedPercentOfLocale =
    totalLocaleSize > 0
      ? Math.round((totalUnusedLocaleSize / totalLocaleSize) * 100)
      : 0;

  return {
    currentLocale,
    totalPageSize,
    renderedContentSize,
    contentSize,
    totalLocaleSize,
    totalUnusedLocaleSize,
    unusedPercentOfLocale,
    mainBundleChunks,
    lazyBundleChunks,
  };
};
