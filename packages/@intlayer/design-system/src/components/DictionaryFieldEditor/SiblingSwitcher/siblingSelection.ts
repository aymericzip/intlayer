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
