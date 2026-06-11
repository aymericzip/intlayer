import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';

/** A `translation` node, e.g. `{ nodeType: 'translation', translation: { en, fr } }`. */
type TranslationNode = {
  nodeType: typeof NodeTypes.TRANSLATION;
  [NodeTypes.TRANSLATION]: Record<string, unknown>;
};

const isTranslationNode = (node: unknown): node is TranslationNode =>
  typeof node === 'object' &&
  node !== null &&
  (node as { nodeType?: unknown }).nodeType === NodeTypes.TRANSLATION;

const isTypedNode = (
  node: unknown
): node is { nodeType: string; [key: string]: unknown } =>
  typeof node === 'object' &&
  node !== null &&
  !Array.isArray(node) &&
  typeof (node as { nodeType?: unknown }).nodeType === 'string';

/** Structural equality for leaf source values (string / number / nested objects). */
const isSameValue = (a: unknown, b: unknown): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

/**
 * Recursively compares `next` against `previous` and returns the sub-tree of
 * `next` that holds only the nodes whose source-locale value was added or
 * changed. Returns `undefined` when nothing changed at this node.
 */
const getEditedNode = (
  previous: ContentNode | undefined,
  next: ContentNode,
  defaultLocale: LocalesValues
): ContentNode | undefined => {
  // Translation node: compare the default-locale leaf only.
  if (isTranslationNode(next)) {
    const nextValue = next[NodeTypes.TRANSLATION]?.[defaultLocale as string];
    const previousValue = isTranslationNode(previous)
      ? previous[NodeTypes.TRANSLATION]?.[defaultLocale as string]
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
      [NodeTypes.TRANSLATION]: { [defaultLocale as string]: nextValue },
    } as ContentNode;
  }

  // Other typed nodes (enumeration, condition, nested, …): recurse into the
  // wrapped value while preserving the wrapper so the partial stays valid.
  if (isTypedNode(next)) {
    const { nodeType } = next;
    const previousInner = isTypedNode(previous)
      ? (previous[nodeType] as ContentNode | undefined)
      : undefined;
    const editedInner = getEditedNode(
      previousInner,
      next[nodeType] as ContentNode,
      defaultLocale
    );

    if (typeof editedInner === 'undefined') {
      return undefined;
    }

    return {
      nodeType,
      [nodeType]: editedInner,
    } as ContentNode;
  }

  // Arrays: keep changed items reduced to source-only, unchanged items as-is to
  // preserve index alignment for `mergeDictionaries` (which merges by index).
  if (Array.isArray(next)) {
    const previousArray = Array.isArray(previous) ? previous : [];
    let hasChange = false;

    const result = next.map((child, index) => {
      const editedChild = getEditedNode(
        previousArray[index] as ContentNode | undefined,
        child as ContentNode,
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

    return hasChange ? (result as ContentNode) : undefined;
  }

  // Plain objects: recurse into each key, keeping only changed branches.
  if (typeof next === 'object' && next !== null) {
    const previousObject =
      typeof previous === 'object' &&
      previous !== null &&
      !Array.isArray(previous)
        ? (previous as Record<string, ContentNode>)
        : undefined;

    const result: Record<string, ContentNode> = {};
    let hasChange = false;

    for (const key of Object.keys(next as Record<string, ContentNode>)) {
      const editedChild = getEditedNode(
        previousObject?.[key],
        (next as Record<string, ContentNode>)[key],
        defaultLocale
      );
      if (typeof editedChild !== 'undefined') {
        result[key] = editedChild;
        hasChange = true;
      }
    }

    return hasChange ? (result as ContentNode) : undefined;
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
  getEditedNode(previousContent, newContent, defaultLocale) ??
  ({} as ContentNode);

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
