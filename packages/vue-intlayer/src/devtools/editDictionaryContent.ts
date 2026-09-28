import type { Dictionary } from '@intlayer/types/dictionary';
import { ROOT_PATH } from './formatDictionaryForInspector';

/**
 * Description of a content edit coming from the devtools inspector: either a
 * per-locale edit of a translation node, or a whole-value edit of a plain
 * string leaf.
 */
export type DictionaryEdit =
  | { kind: 'translation'; path: string; locale: string }
  | { kind: 'plain-string'; path: string };

/**
 * Editability of a flattened content path, used to flag the inspector rows.
 */
export type Editability = 'translation' | 'plain-string';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, unknown>;
};

const isTranslationNode = (value: unknown): value is TranslationNode =>
  isRecord(value) &&
  value.nodeType === 'translation' &&
  isRecord(value.translation);

/**
 * Resolve a flattened (dot-joined) content path to the node it targets.
 * Returns `null` when any segment is missing. Arrays are traversed through
 * their numeric indices, mirroring `formatDictionaryForInspector`.
 */
const resolveContentPath = (
  dictionary: Dictionary,
  path: string
): { parent: Record<string, unknown>; lastSegment: string } | null => {
  const segments = path.split('.');

  let parent = dictionary.content as Record<string, unknown>;

  for (const segment of segments.slice(0, -1)) {
    const child: unknown = parent?.[segment];

    if (!isRecord(child) && !Array.isArray(child)) return null;

    parent = child as Record<string, unknown>;
  }

  const lastSegment = segments[segments.length - 1];

  if (!lastSegment || (!isRecord(parent) && !Array.isArray(parent))) {
    return null;
  }

  return { parent, lastSegment };
};

/**
 * Tell whether the value at a flattened content path can be edited from the
 * devtools inspector: plain string leaves are editable as a whole, and
 * translation nodes are editable per locale when every locale holds a plain
 * string. Rich nodes (markdown, html, insertion…), numbers and nested
 * structures stay read-only.
 */
export const getEditability = (
  dictionary: Dictionary,
  path: string
): Editability | null => {
  if (path === ROOT_PATH) return null;

  const resolved = resolveContentPath(dictionary, path);

  if (!resolved) return null;

  const target: unknown = resolved.parent[resolved.lastSegment];

  if (typeof target === 'string') return 'plain-string';

  if (
    isTranslationNode(target) &&
    Object.values(target.translation).every(
      (localeValue) => typeof localeValue === 'string'
    )
  ) {
    return 'translation';
  }

  return null;
};

/**
 * Parse the `path` array of an `editInspectorState` payload into a content
 * edit.
 *
 * The devtools frontend builds the path from the edited state entry: the
 * flattened translation path is always a single segment (even when it
 * contains dots), optionally followed by the locale key. The leading section
 * name is stripped defensively — some devtools frontends include it.
 *
 * Returns `null` for paths that do not address a single editable value
 * (group rows, object values, deeper nesting).
 */
export const parseEditPath = (
  path: string[],
  sectionName = 'Translations'
): DictionaryEdit | null => {
  const segments = path[0] === sectionName ? path.slice(1) : path;

  if (segments.length === 1) {
    const [translationPath] = segments;

    if (!translationPath || translationPath === ROOT_PATH) return null;

    return { kind: 'plain-string', path: translationPath };
  }

  if (segments.length === 2) {
    const [translationPath, locale] = segments;

    if (!translationPath || translationPath === ROOT_PATH || !locale) {
      return null;
    }

    return { kind: 'translation', path: translationPath, locale };
  }

  return null;
};

/**
 * Apply a devtools edit to a dictionary declaration and return the updated
 * declaration, ready to be sent back to the editor server.
 *
 * The input dictionary is never mutated: its content is deep-cloned first.
 * Returns `null` when the targeted node is not editable — the path does not
 * resolve, the translation node does not hold a plain string for the edited
 * locale (markdown, html, insertion… nodes stay read-only), or a
 * plain-string edit targets a non-string value.
 */
export const applyDictionaryEdit = (
  dictionary: Dictionary,
  edit: DictionaryEdit,
  newValue: string
): Dictionary | null => {
  const content = structuredClone(dictionary.content) as Record<
    string,
    unknown
  >;
  const resolved = resolveContentPath({ ...dictionary, content }, edit.path);

  if (!resolved) return null;

  const target: unknown = resolved.parent[resolved.lastSegment];

  if (edit.kind === 'translation') {
    if (!isTranslationNode(target)) return null;
    if (typeof target.translation[edit.locale] !== 'string') return null;

    target.translation[edit.locale] = newValue;
  } else {
    if (typeof target !== 'string') return null;

    resolved.parent[resolved.lastSegment] = newValue;
  }

  return { ...dictionary, content };
};
