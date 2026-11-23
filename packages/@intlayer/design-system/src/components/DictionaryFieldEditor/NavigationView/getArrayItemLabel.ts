import type { ContentNode } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';

/** Fields read, in priority order, to name an array item. */
const LABEL_FIELD_NAMES = ['title', 'name', 'label', 'id', 'key'] as const;

/** Longest label returned before it is cut with an ellipsis. */
const MAX_LABEL_LENGTH = 60;

/** Unwraps a translation node to its `locale` value (or its first one). */
const resolveTranslation = (
  node: ContentNode,
  locale?: LocalesValues
): ContentNode => {
  if (
    !node ||
    typeof node !== 'object' ||
    (node as { nodeType?: unknown }).nodeType !== NodeTypes.TRANSLATION
  ) {
    return node;
  }

  const translations = (node as unknown as Record<string, unknown>)[
    NodeTypes.TRANSLATION
  ] as Record<string, ContentNode> | undefined;

  if (!translations) return undefined;

  return (
    (locale ? translations[locale] : undefined) ??
    Object.values(translations)[0]
  );
};

/**
 * Human-readable label for an array item, taken from its `title`, `name`,
 * `label`, `id` or `key` field. Returns `undefined` when the item is not a
 * plain object or has none of those fields as a non-empty string or number.
 */
export const getArrayItemLabel = (
  item: ContentNode,
  locale?: LocalesValues
): string | undefined => {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return undefined;
  }

  if (typeof (item as { nodeType?: unknown }).nodeType === 'string') {
    return undefined;
  }

  const fields = item as unknown as Record<string, ContentNode>;

  for (const fieldName of LABEL_FIELD_NAMES) {
    const value = resolveTranslation(fields[fieldName], locale);

    if (typeof value === 'number') return String(value);

    if (typeof value === 'string' && value.trim().length > 0) {
      const label = value.trim();

      return label.length > MAX_LABEL_LENGTH
        ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…`
        : label;
    }
  }

  return undefined;
};
