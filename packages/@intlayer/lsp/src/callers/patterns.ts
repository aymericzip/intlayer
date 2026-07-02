import { escapeRegularExpression } from '../findFieldInFile';
import { getPositionalKeyCallerNames } from './index';

/**
 * Alternation of every caller name whose dictionary key appears as a
 * positional string argument — for building text-search patterns.
 */
export const getCallerNamesAlternation = (): string =>
  getPositionalKeyCallerNames().join('|');

/**
 * Regexes matching call sites that reference the dictionary `key` in project
 * source files. Used by "find all references" (content file → call sites).
 *
 * Two shapes are covered:
 *  1. Positional key argument, with optional TypeScript generic:
 *     `useIntlayer("key")`, `useTranslations<T>("key")`, `getFixedT("en", "key")`
 *  2. Options/descriptor object property:
 *     `getTranslations({ namespace: 'key' })`, `useI18n({ namespace: 'key' })`,
 *     `formatMessage({ id: 'key.field' })`
 *
 * @param key - The dictionary key to search for.
 */
export const buildKeyUsagePatterns = (key: string): RegExp[] => {
  const escapedKey = escapeRegularExpression(key);

  return [
    new RegExp(
      `\\b(?:${getCallerNamesAlternation()})\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(['"\`])${escapedKey}\\1`,
      'g'
    ),
    new RegExp(
      `\\{\\s*(?:id|namespace)\\s*:\\s*(['"\`])${escapedKey}(?:\\.[^'"\`\\n]*)?\\1`,
      'g'
    ),
  ];
};

/**
 * Regex testing whether a file contains a caller invoked with the given
 * dictionary key — a cheap pre-filter before running field-level analysis.
 *
 * @param key - The dictionary key.
 */
export const buildCallerWithKeyPattern = (key: string): RegExp =>
  new RegExp(
    `\\b(?:${getCallerNamesAlternation()})\\b(?:<[^<>()]*>)?\\s*\\(\\s*['"\`]${escapeRegularExpression(key)}['"\`]`
  );
