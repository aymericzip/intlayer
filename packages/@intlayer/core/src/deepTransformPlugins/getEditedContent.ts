import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { TypedNodeModel } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';

/**
 * Structural view of a dictionary content tree.
 *
 * `ContentNode` describes leaves and typed nodes only — the plain objects and
 * arrays that hold them are typed as `any` by the public `Dictionary['content']`.
 * Declaring those containers explicitly lets the diff walk a whole content tree
 * without casting at every step.
 */
type ContentTree = ContentNode | ContentTree[] | { [key: string]: ContentTree };

/** A `translation` node, e.g. `{ nodeType: 'translation', translation: { en, fr } }`. */
type TranslationNode = TypedNodeModel<
  typeof NodeTypes.TRANSLATION,
  Record<string, ContentTree>
>;

/**
 * Any typed node — a wrapper holding its value under the key named by its own
 * `nodeType` (e.g. `{ nodeType: 'plural', plural: … }`).
 */
type TypedContentNode = {
  nodeType: string;
  [wrappedValueKey: string]: ContentTree;
};

/** Whether `node` is a plain (non-array) object, i.e. a content branch. */
const isRecordNode = (node: ContentTree): node is Record<string, ContentTree> =>
  typeof node === 'object' && node !== null && !Array.isArray(node);

/** Whether `node` is a typed node, whatever its `nodeType`. */
const isTypedNode = (node: ContentTree): node is TypedContentNode =>
  isRecordNode(node) && typeof node.nodeType === 'string';

/** Whether `node` is a `translation` node holding a locale map. */
const isTranslationNode = (node: ContentTree): node is TranslationNode =>
  isTypedNode(node) &&
  node.nodeType === NodeTypes.TRANSLATION &&
  isRecordNode(node[NodeTypes.TRANSLATION]);

/** Structural equality for leaf source values (string / number / nested objects). */
const isSameValue = (a: ContentTree, b: ContentTree): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

/**
 * Recursively compares `next` against `previous` and returns the sub-tree of
 * `next` that holds only the nodes whose source-locale value was added or
 * changed. Returns `undefined` when nothing changed at this node.
 */
const getEditedNode = (
  previous: ContentTree,
  next: ContentTree,
  defaultLocale: LocalesValues
): ContentTree | undefined => {
  // Translation node: compare the default-locale leaf only.
  if (isTranslationNode(next)) {
    const nextValue = next[NodeTypes.TRANSLATION][defaultLocale];
    const previousValue = isTranslationNode(previous)
      ? previous[NodeTypes.TRANSLATION][defaultLocale]
      : undefined;

    // Nothing to (re)translate if the source locale is absent.
    if (typeof nextValue === 'undefined') {
      return undefined;
    }

    // Include only when the source value was added or changed.
    if (isSameValue(previousValue, nextValue)) {
      return undefined;
    }

    // Reduce to the source locale only, so every target locale is regenerated.
    return {
      nodeType: NodeTypes.TRANSLATION,
      [NodeTypes.TRANSLATION]: { [defaultLocale]: nextValue },
    } satisfies TranslationNode;
  }

  // Other typed nodes (enumeration, condition, nested, …): recurse into the
  // wrapped value while preserving the wrapper so the partial stays valid.
  if (isTypedNode(next)) {
    const { nodeType } = next;
    const previousInner = isTypedNode(previous)
      ? previous[nodeType]
      : undefined;
    const editedInner = getEditedNode(
      previousInner,
      next[nodeType],
      defaultLocale
    );

    if (typeof editedInner === 'undefined') {
      return undefined;
    }

    return {
      nodeType,
      [nodeType]: editedInner,
    } satisfies TypedContentNode;
  }

  // Arrays: keep changed items reduced to source-only, unchanged items as-is to
  // preserve index alignment for `mergeDictionaries` (which merges by index).
  if (Array.isArray(next)) {
    const previousArray = Array.isArray(previous) ? previous : [];
    let hasChange = false;

    const result = next.map((child, index) => {
      const editedChild = getEditedNode(
        previousArray[index],
        child,
        defaultLocale
      );
      if (typeof editedChild !== 'undefined') {
        hasChange = true;
        return editedChild;
      }
      // Unchanged item: keep the full node. It already has every locale, so the
      // complete-mode translation pass skips it and the merge leaves it intact.
      return child;
    });

    return hasChange ? result : undefined;
  }

  // Plain objects: recurse into each key, keeping only changed branches.
  if (isRecordNode(next)) {
    const previousObject = isRecordNode(previous) ? previous : undefined;

    const result: Record<string, ContentTree> = {};
    let hasChange = false;

    for (const key of Object.keys(next)) {
      const editedChild = getEditedNode(
        previousObject?.[key],
        next[key],
        defaultLocale
      );
      if (typeof editedChild !== 'undefined') {
        result[key] = editedChild;
        hasChange = true;
      }
    }

    return hasChange ? result : undefined;
  }

  // Primitive leaves are not locale-aware on their own — nothing to translate.
  return undefined;
};

/**
 * Returns the partial content holding only the `translation` nodes whose
 * source (`defaultLocale`) value was added or changed between `previousContent`
 * and `newContent`. Each changed node is reduced to its source locale so that
 * every target locale is regenerated when the partial is translated.
 *
 * Returns `{}` (empty content) when no source value changed.
 *
 * @example
 * // default value of `title` changed → only `title` is returned, source-only
 * getEditedContent(
 *   { title: t({ en: 'Old', fr: 'Vieux' }), body: t({ en: 'B', fr: 'B' }) },
 *   { title: t({ en: 'New', fr: 'Vieux' }), body: t({ en: 'B', fr: 'B' }) },
 *   'en'
 * ); // → { title: { nodeType: 'translation', translation: { en: 'New' } } }
 */
export const getEditedContent = (
  previousContent: ContentNode | undefined,
  newContent: ContentNode,
  defaultLocale: LocalesValues
): ContentNode =>
  // The result is a sub-tree of `newContent`, so narrowing the structural
  // `ContentTree` back to the public `ContentNode` is sound: only the plain
  // containers `ContentNode` leaves untyped are dropped from the type.
  (getEditedNode(previousContent, newContent, defaultLocale) ??
    {}) as ContentNode;

/**
 * Dictionary-level wrapper around {@link getEditedContent}. Returns a partial
 * dictionary (same `key`) whose `content` holds only the changed source nodes.
 *
 * @param previousDictionary - Dictionary state before the edit.
 * @param newDictionary - Dictionary state after the edit.
 * @param defaultLocale - The source locale to diff against.
 */
export const getEditedDictionary = (
  previousDictionary: Dictionary | undefined,
  newDictionary: Dictionary,
  defaultLocale: LocalesValues
): Dictionary => ({
  ...newDictionary,
  content: getEditedContent(
    previousDictionary?.content,
    newDictionary.content,
    defaultLocale
  ),
});
