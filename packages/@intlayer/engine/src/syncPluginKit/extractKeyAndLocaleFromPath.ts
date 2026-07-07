import type { Locale } from '@intlayer/types/allLocales';

const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Extract the dictionary key and locale of a file path by matching it against
 * a mask pattern where `{{__KEY__}}` and `{{__LOCALE__}}` mark the positions
 * of the key and locale segments.
 *
 * Returns `null` when the path does not match the mask, or when the mask
 * contains no placeholder at all (no named capture group can be produced).
 * Missing placeholders fall back to `'index'` for the key and to
 * `defaultLocale` for the locale.
 */
export const extractKeyAndLocaleFromPath = (
  filePath: string,
  maskPattern: string,
  locales: Locale[],
  defaultLocale: Locale
): { key: string; locale: Locale } | null => {
  const keyPlaceholder = '{{__KEY__}}';
  const localePlaceholder = '{{__LOCALE__}}';

  // fast-glob strips leading "./" from returned paths; normalize both sides
  const normalize = (path: string) =>
    path.startsWith('./') ? path.slice(2) : path;

  const normalizedFilePath = normalize(filePath);
  const normalizedMask = normalize(maskPattern);

  const localesAlternation = locales.join('|');

  // Escape special regex chars, then convert glob wildcards to regex equivalents.
  // Must replace ** before * to avoid double-replacing.
  let regexString = `^${escapeRegex(normalizedMask)}$`;
  regexString = regexString.replace(/\\\*\\\*/g, '.*'); // ** → match any path segments
  regexString = regexString.replace(/\\\*/g, '[^/]*'); // * → match within a single segment

  regexString = regexString.replace(
    escapeRegex(localePlaceholder),
    `(?<locale>${localesAlternation})`
  );

  if (normalizedMask.includes(keyPlaceholder)) {
    regexString = regexString.replace(
      escapeRegex(keyPlaceholder),
      '(?<key>.+)'
    );
  }

  const maskRegex = new RegExp(regexString);
  const match = maskRegex.exec(normalizedFilePath);

  if (!match?.groups) {
    return null;
  }

  const key = (match.groups.key as string | undefined) ?? 'index';
  const locale = (match.groups.locale as Locale | undefined) ?? defaultLocale;

  return { key, locale };
};
