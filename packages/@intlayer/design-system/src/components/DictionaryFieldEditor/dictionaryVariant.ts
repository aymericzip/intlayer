import type {
  Dictionary,
  DictionaryVariantValue,
} from '@intlayer/types/dictionary';

/** A dictionary variant: one value, or several (variant group). */
export type DictionaryVariant =
  | DictionaryVariantValue
  | DictionaryVariantValue[];

/**
 * Renders a variant as editable text: named variants as-is, structured
 * (object) and grouped (array) variants as JSON.
 */
export const formatDictionaryVariant = (
  variant: DictionaryVariant | undefined
): string => {
  if (variant === undefined) return '';

  return typeof variant === 'string' ? variant : JSON.stringify(variant);
};

/**
 * Parses the text edited in the CMS back to a variant: a value starting with
 * `{` or `[` is parsed as JSON, anything else is a named variant.
 */
export const parseDictionaryVariant = (
  raw: string
): { variant: DictionaryVariant; error: boolean } => {
  const trimmed = raw.trim();

  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return { variant: raw, error: false };
  }

  try {
    return { variant: JSON.parse(trimmed) as DictionaryVariant, error: false };
  } catch {
    return { variant: raw, error: true };
  }
};

/**
 * Splits a dictionary `variant` field into tag labels: a named variant gives
 * one tag, a structured variant gives one `key: value` tag per field.
 */
export const getDictionaryVariantTagLabels = (
  variant: Dictionary['variant']
): string[] => {
  if (variant === undefined) return [];

  const variantValues = Array.isArray(variant) ? variant : [variant];

  const tagLabels = variantValues.flatMap((variantValue) =>
    typeof variantValue === 'string'
      ? [variantValue]
      : Object.entries(variantValue)
          .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
          .map(([entryKey, entryValue]) => `${entryKey}: ${entryValue}`)
  );

  return [...new Set(tagLabels)];
};
