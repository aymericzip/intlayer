import type { Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';

/**
 * Flattened representation of a dictionary content for the devtools
 * inspector: each leaf path maps to its per-locale translations, or to a
 * stringified fallback for non-translation content.
 */
export type FlattenedDictionary = Record<
  string,
  Record<string, string> | string
>;

/**
 * One inspector row: the displayed label, the `KeyPath` addressing the node
 * in the dictionary content, and the displayed value.
 */
export type InspectorEntry = {
  label: string;
  keyPath: KeyPath[];
  value: Record<string, string> | string;
};

/**
 * Label used for a typed node sitting at the root of the dictionary content.
 */
export const ROOT_PATH = '(root)';

type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, string>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isTranslationNode = (value: unknown): value is TranslationNode =>
  isRecord(value) &&
  value.nodeType === NodeTypes.TRANSLATION &&
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

/**
 * Dot-joined label of a key path. Keys holding a dot are quoted so that
 * `{ 'a.b': … }` and `{ a: { b: … } }` never share a label.
 */
const formatLabel = (keyPath: KeyPath[]): string =>
  keyPath.length === 0
    ? ROOT_PATH
    : keyPath
        .map(({ key }) => {
          const segment = String(key);

          return segment.includes('.') ? JSON.stringify(segment) : segment;
        })
        .join('.');

const collectEntries = (
  node: unknown,
  keyPath: KeyPath[],
  entries: InspectorEntry[]
): void => {
  const label = formatLabel(keyPath);

  if (isTranslationNode(node)) {
    entries.push({ label, keyPath, value: node.translation });
    return;
  }

  if (isRecord(node) && typeof node.nodeType === 'string') {
    // Non-translation typed node (markdown, html, insertion, plural…):
    // render its own content as a fallback string instead of recursing.
    entries.push({
      label,
      keyPath,
      value: stringifyFallback(node[node.nodeType]),
    });
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      collectEntries(
        item,
        [...keyPath, { type: NodeTypes.ARRAY, key: index }],
        entries
      );
    });
    return;
  }

  if (isRecord(node)) {
    for (const [key, value] of Object.entries(node)) {
      collectEntries(
        value,
        [...keyPath, { type: NodeTypes.OBJECT, key }],
        entries
      );
    }
    return;
  }

  if (keyPath.length > 0) {
    entries.push({ label, keyPath, value: stringifyFallback(node) });
  }
};

/**
 * Recursively list the inspector rows of a dictionary content, each one
 * carrying the `KeyPath` of its node so edits can target it with the core
 * `dictionaryManipulator` helpers.
 */
export const listInspectorEntries = (
  dictionary: Dictionary
): InspectorEntry[] => {
  const entries: InspectorEntry[] = [];

  collectEntries(dictionary.content, [], entries);

  return entries;
};

/**
 * Recursively flatten a dictionary content into leaf-path entries.
 * Translation nodes are exposed as their locale-to-string map; any other
 * node type falls back to a string rendering.
 */
export const formatDictionaryForInspector = (
  dictionary: Dictionary
): FlattenedDictionary =>
  Object.fromEntries(
    listInspectorEntries(dictionary).map(({ label, value }) => [label, value])
  );
