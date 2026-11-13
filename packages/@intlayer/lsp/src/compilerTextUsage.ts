import { isAbsolute, relative, resolve, sep } from 'node:path';
import type { OffsetSpan } from './findFieldDeclaration';
import { escapeRegularExpression } from './findFieldInFile';

/**
 * Compiler-generated dictionaries: with `compiler.saveComponents: false` the
 * component keeps its raw strings (`<h1>My title</h1>`) and never names its
 * dictionary, so the only link between both is the `componentFilePath` the
 * compiler stamps on the dictionary and the source-locale text of each field.
 */

/** The dictionary fields this module reads. */
export type CompilerDictionary = {
  key: string;
  content?: unknown;
  locale?: string;
  componentFilePath?: string;
};

/** One extracted string: where it is declared, and its source-locale text. */
export type CompilerTextField = {
  dictionaryKey: string;
  fieldPath: string[];
  text: string;
};

/** A compiler text field found at a source-file span. */
export type CompilerTextMatch = OffsetSpan & { field: CompilerTextField };

/** `{{name}}` placeholders the compiler emits for interpolated expressions. */
const PLACEHOLDER_PATTERN = /\{\{[^{}]*\}\}/g;

/** Source forms of an interpolation: `{name}`, `${name}`, `{{ name }}`. */
const SOURCE_PLACEHOLDER_PATTERN =
  '(?:\\$\\{[^{}]*\\}|\\{\\{[^{}]*\\}\\}|\\{[^{}]*\\})';

const WORD_CHARACTER = /[\p{L}\p{N}_]/u;

/**
 * Path the compiler stores in `componentFilePath`: relative to the project
 * root, POSIX separators.
 */
export const toComponentFilePath = (
  baseDir: string,
  absolutePath: string
): string => relative(baseDir, resolve(absolutePath)).split(sep).join('/');

/** Absolute path of a dictionary's `componentFilePath`. */
export const resolveComponentFilePath = (
  baseDir: string,
  componentFilePath: string
): string =>
  isAbsolute(componentFilePath)
    ? componentFilePath
    : resolve(baseDir, componentFilePath);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Source-locale text of a leaf: a plain string (per-locale dictionary), a
 * `translation` node, or an `insertion` node wrapping either.
 */
const getLeafText = (node: unknown, locale: string): string | null => {
  if (typeof node === 'string') return node;

  if (!isRecord(node)) return null;

  if (node['nodeType'] === 'insertion') {
    return getLeafText(node['insertion'], locale);
  }

  if (node['nodeType'] === 'translation' && isRecord(node['translation'])) {
    const translations = node['translation'];

    return getLeafText(
      translations[locale] ?? Object.values(translations)[0],
      locale
    );
  }

  return null;
};

/**
 * Every string field of the compiler dictionaries, in their source locale.
 * Per-locale dictionaries of another locale are skipped.
 */
export const collectCompilerTextFields = (
  dictionaries: CompilerDictionary[],
  sourceLocale: string
): CompilerTextField[] => {
  const fields: CompilerTextField[] = [];
  const seenFields = new Set<string>();

  const walk = (
    dictionaryKey: string,
    node: unknown,
    fieldPath: string[]
  ): void => {
    const text = fieldPath.length > 0 ? getLeafText(node, sourceLocale) : null;

    if (text !== null) {
      const fieldId = [dictionaryKey, ...fieldPath].join('\u0000');

      if (!seenFields.has(fieldId) && text.trim()) {
        seenFields.add(fieldId);
        fields.push({ dictionaryKey, fieldPath, text });
      }
      return;
    }

    if (!isRecord(node) || 'nodeType' in node) return;

    for (const [fieldName, child] of Object.entries(node)) {
      walk(dictionaryKey, child, [...fieldPath, fieldName]);
    }
  };

  for (const dictionary of dictionaries) {
    if (!dictionary.componentFilePath) continue;

    if (dictionary.locale && dictionary.locale !== sourceLocale) continue;

    walk(dictionary.key, dictionary.content, []);
  }

  return fields;
};

/**
 * Literal part of a field text: runs of whitespace match any whitespace (JSX
 * wraps lines), quotes may be escaped in a JS string.
 */
const toLiteralPattern = (literal: string): string =>
  literal
    .split(/(\s+)/)
    .map((part) =>
      /^\s+$/.test(part)
        ? '\\s+'
        : escapeRegularExpression(part).replace(/(['"`])/g, '\\\\?$1')
    )
    .join('');

/**
 * Pattern matching a compiler field text as written in its component.
 * Returns `null` for text without any literal character.
 */
export const buildCompilerTextPattern = (text: string): RegExp | null => {
  const trimmedText = text.trim();
  const literals = trimmedText.split(PLACEHOLDER_PATTERN);

  if (!literals.some((literal) => literal.trim())) return null;

  const body = literals
    .map(toLiteralPattern)
    .join(SOURCE_PLACEHOLDER_PATTERN)
    // `{{x}} {{y}}` leaves blank literals between placeholders
    .replace(/(?:\\s\+)+/g, '\\s+');

  // Whole words only: `Save` must not match inside `onSave` / `Saved`
  const startBoundary = WORD_CHARACTER.test(trimmedText.charAt(0))
    ? '(?<![\\p{L}\\p{N}_$])'
    : '';
  const endBoundary = WORD_CHARACTER.test(
    trimmedText.charAt(trimmedText.length - 1)
  )
    ? '(?![\\p{L}\\p{N}_])'
    : '';

  return new RegExp(`${startBoundary}${body}${endBoundary}`, 'gu');
};

/** Every span of `sourceText` where `text` is written. */
export const findCompilerTextSpans = (
  sourceText: string,
  text: string
): OffsetSpan[] => {
  const pattern = buildCompilerTextPattern(text);

  if (!pattern) return [];

  return [...sourceText.matchAll(pattern)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
  }));
};

/** Every occurrence of every field in `sourceText`. */
export const findCompilerTextMatches = (
  sourceText: string,
  fields: CompilerTextField[]
): CompilerTextMatch[] =>
  fields.flatMap((field) =>
    findCompilerTextSpans(sourceText, field.text).map((span) => ({
      ...span,
      field,
    }))
  );

/**
 * The field written at `offset`. When several match (`Add` inside `Add item`),
 * the longest wins: it is the string the compiler extracted.
 */
export const findCompilerTextAtOffset = (
  sourceText: string,
  offset: number,
  fields: CompilerTextField[]
): CompilerTextMatch | null => {
  let bestMatch: CompilerTextMatch | null = null;

  for (const match of findCompilerTextMatches(sourceText, fields)) {
    if (offset < match.start || offset > match.end) continue;

    const isLonger =
      !bestMatch || match.end - match.start > bestMatch.end - bestMatch.start;

    if (isLonger) bestMatch = match;
  }

  return bestMatch;
};
