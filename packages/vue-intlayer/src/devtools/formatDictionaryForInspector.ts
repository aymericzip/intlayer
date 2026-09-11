import type { Dictionary } from '@intlayer/types/dictionary';

/**
 * Flattened representation of a dictionary content for the devtools
 * inspector: each leaf path maps to its per-locale translations, or to a
 * stringified fallback for non-translation content.
 */
export type FlattenedDictionary = Record<
  string,
  Record<string, string> | string
>;

type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, string>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isTranslationNode = (value: unknown): value is TranslationNode =>
  isRecord(value) &&
  value.nodeType === 'translation' &&
  isRecord(value.translation);

/**
 * Best-effort string rendering of non-translation content nodes.
 */
const stringifyFallback = (value: unknown): string => {
  if (typeof value === 'string') return value;

  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
};

const flattenContent = (
  node: unknown,
  path: string[],
  result: FlattenedDictionary
): void => {
  const leafPath = path.length === 0 ? '(root)' : path.join('.');

  if (isTranslationNode(node)) {
    result[leafPath] = node.translation;
    return;
  }

  if (isRecord(node) && typeof node.nodeType === 'string') {
    // Non-translation typed node (markdown, html, insertion, plural…):
    // render its own content as a fallback string instead of recursing.
    result[leafPath] = stringifyFallback(node[node.nodeType]);
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      flattenContent(item, [...path, String(index)], result);
    });
    return;
  }

  if (isRecord(node)) {
    for (const [key, value] of Object.entries(node)) {
      flattenContent(value, [...path, key], result);
    }
    return;
  }

  if (path.length > 0) {
    result[path.join('.')] = stringifyFallback(node);
  }
};

/**
 * Recursively flatten a dictionary content into leaf-path entries.
 * Translation nodes are exposed as their locale-to-string map; any other
 * node type falls back to a string rendering.
 */
export const formatDictionaryForInspector = (
  dictionary: Dictionary
): FlattenedDictionary => {
  const result: FlattenedDictionary = {};

  flattenContent(dictionary.content, [], result);

  return result;
};
