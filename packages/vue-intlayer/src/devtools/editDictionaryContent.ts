import {
  editDictionaryByKeyPath,
  getContentNodeByKeyPath,
} from '@intlayer/core/dictionaryManipulator';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { listInspectorEntries } from './formatDictionaryForInspector';

/**
 * Edit coming from the devtools inspector: the label of the edited row, plus
 * the locale when a single locale of a translation row was edited.
 */
export type InspectorEdit = { label: string; locale?: string };

/**
 * Editability of an inspector row: a translation node editable per locale,
 * or a plain string leaf editable as a whole.
 */
export type Editability = 'translation' | 'plain-string';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Tell whether the node at `keyPath` can be edited from the devtools
 * inspector: plain string leaves are editable as a whole, and translation
 * nodes are editable per locale when every locale holds a plain string.
 * Rich nodes (markdown, html, insertion…), numbers and nested structures stay
 * read-only.
 */
export const getEditability = (
  dictionary: Dictionary,
  keyPath: KeyPath[]
): Editability | null => {
  const node: unknown = getContentNodeByKeyPath(dictionary.content, keyPath);

  if (typeof node === 'string') return 'plain-string';

  if (
    isRecord(node) &&
    node.nodeType === NodeTypes.TRANSLATION &&
    isRecord(node[NodeTypes.TRANSLATION]) &&
    Object.values(node[NodeTypes.TRANSLATION]).every(
      (localeValue) => typeof localeValue === 'string'
    )
  ) {
    return 'translation';
  }

  return null;
};

/**
 * Parse the `path` array of an `editInspectorState` payload.
 *
 * The devtools frontend builds the path from the edited state entry: the row
 * label is always a single segment (even when it contains dots), optionally
 * followed by the locale key. The leading section name is stripped
 * defensively — some devtools frontends include it.
 *
 * Returns `null` for paths that do not address a single value.
 */
export const parseEditPath = (
  path: string[],
  sectionName = 'Translations'
): InspectorEdit | null => {
  const [label, locale, ...rest] =
    path[0] === sectionName ? path.slice(1) : path;

  if (!label || rest.length > 0) return null;

  return locale ? { label, locale } : { label };
};

/**
 * Resolve an inspector edit to the `KeyPath` of the edited string: the row
 * key path, extended with the locale for a translation edit. Returns `null`
 * when no row of `dictionary` carries the edited label.
 */
export const getEditKeyPath = (
  dictionary: Dictionary,
  edit: InspectorEdit
): KeyPath[] | null => {
  const entry = listInspectorEntries(dictionary).find(
    ({ label }) => label === edit.label
  );

  if (!entry) return null;

  return edit.locale
    ? [...entry.keyPath, { type: NodeTypes.TRANSLATION, key: edit.locale }]
    : entry.keyPath;
};

/**
 * Replace the string at `keyPath` and return the updated declaration, ready
 * to be sent back to the editor server. The input dictionary is never
 * mutated. Returns `null` when `keyPath` does not address an existing string
 * (missing locale, rich node, number…), so an edit never creates a node.
 */
export const applyDictionaryEdit = (
  dictionary: Dictionary,
  keyPath: KeyPath[],
  newValue: string
): Dictionary | null => {
  const currentValue: unknown = getContentNodeByKeyPath(
    dictionary.content,
    keyPath
  );

  if (typeof currentValue !== 'string') return null;

  const content = editDictionaryByKeyPath(
    structuredClone(dictionary.content),
    keyPath,
    newValue as ContentNode
  );

  return { ...dictionary, content };
};
