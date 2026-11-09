import { getNodeType } from '@intlayer/core/dictionaryManipulator';
import type {
  ContentNode,
  Dictionary,
  DictionaryVariantValue,
} from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import {
  flattenContentRows,
  SHARED_CELL_KEY,
} from '../ContentGrid/flattenContentRows';
import { formatDictionaryVariant } from '../dictionaryVariant';

/** Variant id the runtime falls back to when no variant is selected. */
export const DEFAULT_VARIANT_NAME = 'default';

/** Selected sibling coordinates; `null` means "not narrowed on this axis". */
export type SiblingSelection = {
  item: number | null;
  variant: string | null;
};

/** One variant declared on a key, as shown in the switcher. */
export type VariantIdentity = {
  /** Serialized identity, matched against `formatDictionaryVariant`. */
  identity: string;
  /** Raw value of the first id (used in code snippets). */
  primaryValue: DictionaryVariantValue;
  /** Other ids the same content answers to (array variants). */
  aliases: DictionaryVariantValue[];
  /** True for object variants (`{ plan: 'pro' }`). */
  isStructured: boolean;
  /** True for the `default` variant. */
  isDefault: boolean;
};

/** Collection item numbers declared by a set of siblings, ascending. */
export const getItemNumbers = (siblings: Dictionary[]): number[] =>
  [
    ...new Set(
      siblings
        .map((sibling) => sibling.item)
        .filter((item): item is number => item !== undefined)
    ),
  ].sort((first, second) => first - second);

/** Variants declared by a set of siblings, in declaration order. */
export const getVariantIdentities = (
  siblings: Dictionary[]
): VariantIdentity[] => {
  const identities = new Map<string, VariantIdentity>();

  for (const sibling of siblings) {
    if (sibling.variant === undefined) continue;

    const identity = formatDictionaryVariant(sibling.variant);
    if (identities.has(identity)) continue;

    const [primaryValue, ...aliases] = Array.isArray(sibling.variant)
      ? sibling.variant
      : [sibling.variant];

    identities.set(identity, {
      identity,
      primaryValue: primaryValue ?? identity,
      aliases,
      isStructured: typeof primaryValue === 'object',
      isDefault: primaryValue === DEFAULT_VARIANT_NAME,
    });
  }

  return [...identities.values()];
};

/** Scalar value of one field of a structured variant. */
export type VariantDimensionValue = string | number;

/** One field shared by structured variants (`id`, `category`…). */
export type VariantDimension = {
  name: string;
  /** Distinct values, in declaration order. */
  values: VariantDimensionValue[];
};

/** Field values of a structured variant, `undefined` for named variants. */
export const getStructuredVariantFields = (
  variant: VariantIdentity | undefined
): Record<string, VariantDimensionValue> | undefined =>
  variant && typeof variant.primaryValue === 'object'
    ? variant.primaryValue
    : undefined;

/**
 * Splits structured variants into one dimension per field, so `N` variants
 * over `D` fields render as `D` selectors instead of `N` JSON chips.
 */
export const getVariantDimensions = (
  variants: VariantIdentity[]
): VariantDimension[] => {
  const valuesByDimension = new Map<string, Set<VariantDimensionValue>>();

  for (const variant of variants) {
    const fields = getStructuredVariantFields(variant);
    if (!fields) continue;

    for (const [name, value] of Object.entries(fields)) {
      const values = valuesByDimension.get(name) ?? new Set();
      values.add(value);
      valuesByDimension.set(name, values);
    }
  }

  return [...valuesByDimension.entries()]
    .sort(([firstName], [secondName]) => firstName.localeCompare(secondName))
    .map(([name, values]) => ({ name, values: [...values] }));
};

/**
 * Structured variant to select when one dimension is set to a value: the
 * variant having that value which keeps the most other fields of the current
 * selection. `undefined` when no variant has that value.
 */
export const resolveVariantForDimension = (
  variants: VariantIdentity[],
  currentVariant: VariantIdentity | undefined,
  dimensionName: string,
  value: VariantDimensionValue
): VariantIdentity | undefined => {
  const currentFields = getStructuredVariantFields(currentVariant) ?? {};
  let bestVariant: VariantIdentity | undefined;
  let bestScore = -1;

  for (const variant of variants) {
    const fields = getStructuredVariantFields(variant);
    if (fields?.[dimensionName] !== value) continue;

    const score = Object.entries(currentFields).filter(
      ([name, currentValue]) =>
        name !== dimensionName && fields[name] === currentValue
    ).length;

    if (score > bestScore) {
      bestVariant = variant;
      bestScore = score;
    }
  }

  return bestVariant;
};

/**
 * True when changing one dimension keeps every other field of the current
 * selection (the combination is declared).
 */
export const isVariantCombinationDeclared = (
  variants: VariantIdentity[],
  currentVariant: VariantIdentity | undefined,
  dimensionName: string,
  value: VariantDimensionValue
): boolean => {
  const currentFields = getStructuredVariantFields(currentVariant);
  if (!currentFields) return true;

  const targetFields = { ...currentFields, [dimensionName]: value };

  return variants.some((variant) => {
    const fields = getStructuredVariantFields(variant);

    return (
      fields !== undefined &&
      Object.keys(fields).length === Object.keys(targetFields).length &&
      Object.entries(targetFields).every(
        ([name, targetValue]) => fields[name] === targetValue
      )
    );
  });
};

/**
 * True when both records are the same dictionary: compared by backend `id`,
 * then by `localId`. Remote records may lack a `localId`, so two missing ids
 * never count as a match.
 */
export const isSameDictionary = (
  firstDictionary: Dictionary,
  secondDictionary: Dictionary
): boolean => {
  if (firstDictionary.id && secondDictionary.id)
    return firstDictionary.id === secondDictionary.id;

  if (firstDictionary.localId && secondDictionary.localId)
    return firstDictionary.localId === secondDictionary.localId;

  return firstDictionary === secondDictionary;
};

/** Unqualified sibling acting as base content, if any. */
export const getBaseSibling = (
  siblings: Dictionary[]
): Dictionary | undefined =>
  siblings.find(
    (sibling) => sibling.item === undefined && sibling.variant === undefined
  );

/** Finds the sibling matching a selection, `undefined` for the base. */
export const findSiblingForSelection = (
  siblings: Dictionary[],
  { item, variant }: SiblingSelection
): Dictionary | undefined => {
  if (item === null && variant === null) return undefined;

  return siblings.find(
    (sibling) =>
      (item === null || sibling.item === item) &&
      (variant === null || formatDictionaryVariant(sibling.variant) === variant)
  );
};

/** Selection describing a given sibling dictionary. */
export const getSelectionOfSibling = (
  dictionary: Pick<Dictionary, 'item' | 'variant'>
): SiblingSelection => ({
  item: dictionary.item ?? null,
  variant:
    dictionary.variant === undefined
      ? null
      : formatDictionaryVariant(dictionary.variant),
});

const getTopLevelKeys = (content: ContentNode): string[] => {
  if (getNodeType(content) !== NodeTypes.OBJECT) return [];

  return Object.keys(content as unknown as Record<string, ContentNode>);
};

/**
 * Top-level keys each collection item lacks compared to the other items.
 * Items are meant to share one shape, so drift is usually a bug.
 */
export const getShapeDrift = (
  siblings: Dictionary[]
): Record<number, string[]> => {
  const keysByItem = new Map<number, Set<string>>();

  for (const sibling of siblings) {
    if (sibling.item === undefined) continue;

    const itemKeys = keysByItem.get(sibling.item) ?? new Set<string>();
    for (const key of getTopLevelKeys(sibling.content)) itemKeys.add(key);
    keysByItem.set(sibling.item, itemKeys);
  }

  const allKeys = new Set<string>();
  for (const itemKeys of keysByItem.values()) {
    for (const key of itemKeys) allKeys.add(key);
  }

  const drift: Record<number, string[]> = {};
  for (const [item, itemKeys] of keysByItem) {
    const missingKeys = [...allKeys].filter((key) => !itemKeys.has(key));
    if (missingKeys.length > 0) drift[item] = missingKeys;
  }

  return drift;
};

export type ContentSummary = {
  /** First string value, in the source locale when localized. */
  preview: string;
  /** Share (0–1) of filled localized leaves per locale. */
  completenessByLocale: Record<string, number>;
};

/** Preview and per-locale completeness of a dictionary content. */
export const getContentSummary = (
  content: ContentNode,
  locales: string[],
  sourceLocale: string
): ContentSummary => {
  const rows = flattenContentRows(content, { locales, sourceLocale });
  let preview = '';
  const filledByLocale: Record<string, number> = {};
  let localizedLeafCount = 0;

  for (const row of rows) {
    if (row.kind !== 'leaf') continue;

    if (!preview) {
      const value = (row.cells[sourceLocale] ?? row.cells[SHARED_CELL_KEY])
        ?.value;
      if (typeof value === 'string' && value.trim() !== '') preview = value;
    }

    if (!row.isLocalized) continue;
    localizedLeafCount++;

    for (const locale of locales) {
      const cell = row.cells[locale];
      const isFilled =
        cell !== undefined &&
        !cell.isMissing &&
        !(typeof cell.value === 'string' && cell.value.trim() === '');
      if (isFilled) filledByLocale[locale] = (filledByLocale[locale] ?? 0) + 1;
    }
  }

  const completenessByLocale = Object.fromEntries(
    locales.map((locale) => [
      locale,
      localizedLeafCount === 0
        ? 1
        : (filledByLocale[locale] ?? 0) / localizedLeafCount,
    ])
  );

  return { preview, completenessByLocale };
};

const formatVariantArgument = (value: DictionaryVariantValue): string =>
  typeof value === 'string'
    ? `'${value}'`
    : `{ ${Object.entries(value)
        .map(
          ([key, entryValue]) =>
            `${key}: ${typeof entryValue === 'string' ? `'${entryValue}'` : entryValue}`
        )
        .join(', ')} }`;

/** `useIntlayer` call resolving the given selection, as shown to developers. */
export const buildUseIntlayerSnippet = (
  dictionaryKey: string,
  item: number | null,
  variant: VariantIdentity | undefined
): string => {
  const selectorParts = [
    ...(variant
      ? [`variant: ${formatVariantArgument(variant.primaryValue)}`]
      : []),
    ...(item !== null ? [`item: ${item}`] : []),
  ];

  return selectorParts.length === 0
    ? `useIntlayer('${dictionaryKey}')`
    : `useIntlayer('${dictionaryKey}', { ${selectorParts.join(', ')} })`;
};
