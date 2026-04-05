import { ALL_LOCALES } from '@intlayer/types/allLocales';

const allLocaleValues = new Set(Object.values(ALL_LOCALES) as string[]);

const isLocaleCode = (key: string): boolean =>
  allLocaleValues.has(key) || /^[a-z]{2}(-[A-Z]{2,4})?$/.test(key);

/**
 * Given text and a position right after the colon of a JSON key,
 * returns the index just past the end of that value.
 */
const extractValueEnd = (text: string, valueStart: number): number => {
  let cursor = valueStart;

  // Skip whitespace
  while (cursor < text.length && ' \t\n\r'.includes(text[cursor])) {
    cursor++;
  }

  if (cursor >= text.length) {
    return valueStart;
  }

  const char = text[cursor];

  if (char === '{' || char === '[') {
    const endChar = char === '{' ? '}' : ']';
    let depth = 1;
    cursor++;

    while (cursor < text.length && depth > 0) {
      const currentChar = text[cursor];

      if (currentChar === char) {
        depth++;
      } else if (currentChar === endChar) {
        depth--;
      } else if (currentChar === '"') {
        cursor++;
        while (cursor < text.length) {
          if (text[cursor] === '\\') {
            cursor += 2;
            continue;
          }
          if (text[cursor] === '"') break;
          cursor++;
        }
      }
      cursor++;
    }
    return cursor;
  }

  if (char === '"') {
    cursor++;
    while (cursor < text.length) {
      if (text[cursor] === '\\') {
        cursor += 2;
        continue;
      }
      if (text[cursor] === '"') {
        cursor++;
        break;
      }
      cursor++;
    }
    return cursor;
  }

  // number, boolean, null
  const endMatch = text.slice(cursor).search(/[,}\]\s]/);
  return endMatch === -1 ? text.length : cursor + endMatch;
};

type LocaleOccurrence = {
  locale: string;
  keyStart: number;
  valueEnd: number;
  valueSize: number;
};

type LocaleDictionary = {
  localesFound: string[];
  sizeByLocale: Record<string, number>;
  totalSize: number;
};

export type BundleContentAnalysis = {
  currentLocale: string;
  /** total bytes of all detected locale-keyed content */
  totalContentSize: number;
  /** bytes belonging to the current page locale */
  currentLocaleSize: number;
  /** bytes belonging to other locales (waste) */
  unusedLocaleSize: number;
  /** per-locale byte breakdown of the unused portion */
  unusedLocaleBreakdown: Record<string, number>;
  /** number of distinct locale dictionaries detected */
  dictionariesFound: number;
  /** (unusedLocaleSize / totalContentSize) * 100, rounded */
  optimizablePercentage: number;
};

/**
 * Scans inline `<script>` content in the HTML for objects whose keys are
 * all locale codes (e.g. `{"en":{...},"fr":{...}}`).
 * Returns a breakdown of how much content is wasted (wrong locale).
 */
export const analyzeBundleContent = (
  html: string,
  currentLocale: string
): BundleContentAnalysis => {
  // --- 1. Extract all inline <script> content -
  const scriptContents: string[] = [];
  // Also look at __NEXT_DATA__ which may be in a script tag
  const scriptTagRegex = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  let tagMatch = scriptTagRegex.exec(html);
  while (tagMatch !== null) {
    const content = tagMatch[1].trim();
    if (content) scriptContents.push(content);
    tagMatch = scriptTagRegex.exec(html);
  }

  if (scriptContents.length === 0) {
    return {
      currentLocale,
      totalContentSize: 0,
      currentLocaleSize: 0,
      unusedLocaleSize: 0,
      unusedLocaleBreakdown: {},
      dictionariesFound: 0,
      optimizablePercentage: 0,
    };
  }

  const allScriptContent = scriptContents.join('\n');

  // --- 2. Find all locale-key occurrences ----
  // Match patterns like: "en": or "fr-CA":
  const localeKeyRegex = /"([a-z]{2}(?:-[A-Z]{2,4})?)"\s*:/g;
  const occurrences: LocaleOccurrence[] = [];

  let keyMatch = localeKeyRegex.exec(allScriptContent);
  while (keyMatch !== null) {
    const locale = keyMatch[1];
    if (!isLocaleCode(locale)) {
      keyMatch = localeKeyRegex.exec(allScriptContent);
      continue;
    }

    const valueStart = keyMatch.index + keyMatch[0].length;
    const valueEnd = extractValueEnd(allScriptContent, valueStart);
    const valueSize = valueEnd - valueStart;

    // Ignore trivial values (null, true, short strings — not real content)
    if (valueSize < 5) {
      keyMatch = localeKeyRegex.exec(allScriptContent);
      continue;
    }

    occurrences.push({
      locale,
      keyStart: keyMatch.index,
      valueEnd,
      valueSize,
    });
    keyMatch = localeKeyRegex.exec(allScriptContent);
  }

  // --- 3. Group occurrences into dictionaries ---
  // Two occurrences are in the same dictionary if they're within PROXIMITY chars.
  // Since RegExp.exec returns them in order, we can group in a single pass.
  const PROXIMITY = 3000;

  const dictionaries: LocaleDictionary[] = occurrences
    .reduce((acc, current) => {
      const lastGroup = acc[acc.length - 1];
      const lastOcc = lastGroup?.[lastGroup.length - 1];

      if (lastOcc && current.keyStart - lastOcc.valueEnd < PROXIMITY) {
        lastGroup.push(current);
      } else {
        acc.push([current]);
      }
      return acc;
    }, [] as LocaleOccurrence[][])
    // Require at least 2 distinct locale keys to qualify as a dictionary
    .filter((group) => new Set(group.map((o) => o.locale)).size >= 2)
    .map((group) => {
      const sizeByLocale: Record<string, number> = {};
      const localesFound = new Set<string>();

      for (const occ of group) {
        localesFound.add(occ.locale);
        sizeByLocale[occ.locale] =
          (sizeByLocale[occ.locale] ?? 0) + occ.valueSize;
      }

      return {
        localesFound: Array.from(localesFound),
        sizeByLocale,
        totalSize: Object.values(sizeByLocale).reduce((a, b) => a + b, 0),
      };
    });

  // --- 4. Aggregate totals -------------------
  const unusedLocaleBreakdown: Record<string, number> = {};
  let totalContentSize = 0;
  let currentLocaleSize = 0;
  let unusedLocaleSize = 0;

  // Normalise current locale for comparison (handle "en" matching "en-GB" etc.)
  const baseCurrent = currentLocale.split('-')[0].toLowerCase();

  for (const dict of dictionaries) {
    totalContentSize += dict.totalSize;
    for (const [locale, size] of Object.entries(dict.sizeByLocale)) {
      const baseLocale = locale.split('-')[0].toLowerCase();
      if (baseLocale === baseCurrent) {
        currentLocaleSize += size;
      } else {
        unusedLocaleSize += size;
        unusedLocaleBreakdown[locale] =
          (unusedLocaleBreakdown[locale] ?? 0) + size;
      }
    }
  }

  const optimizablePercentage =
    totalContentSize > 0
      ? Math.round((unusedLocaleSize / totalContentSize) * 100)
      : 0;

  return {
    currentLocale,
    totalContentSize,
    currentLocaleSize,
    unusedLocaleSize,
    unusedLocaleBreakdown,
    dictionariesFound: dictionaries.length,
    optimizablePercentage,
  };
};
