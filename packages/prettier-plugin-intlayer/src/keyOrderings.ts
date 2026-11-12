import { findMatchingCondition } from '@intlayer/core/interpreter';
import type { EnumerationContentState } from '@intlayer/core/transpiler';

/**
 * Returns the given keys in their canonical order, or `undefined` when the
 * keys must keep their current order.
 */
export type KeyOrdering = (keys: readonly string[]) => string[] | undefined;

const compareStrings = (stringA: string, stringB: string): number => {
  if (stringA === stringB) return 0;

  return stringA < stringB ? -1 : 1;
};

/** Plain alphabetical order, for the keys of a content object. */
export const orderAlphabetically: KeyOrdering = (keys) =>
  [...keys].sort(compareStrings);

/**
 * Builds the comparator ordering locales: pinned locales first (in the given
 * order), then every other locale alphabetically.
 */
export const createLocaleComparator = (pinnedLocales: readonly string[]) => {
  const pinnedRank = new Map(
    pinnedLocales.map((locale, index) => [locale, index])
  );

  return (localeA: string, localeB: string): number => {
    const rankA = pinnedRank.get(localeA) ?? Number.POSITIVE_INFINITY;
    const rankB = pinnedRank.get(localeB) ?? Number.POSITIVE_INFINITY;

    if (rankA !== rankB) return rankA < rankB ? -1 : 1;

    return compareStrings(localeA, localeB);
  };
};

/** Locale order for `t()`: pinned locales, then alphabetical. */
export const createLocaleOrdering = (
  pinnedLocales: readonly string[]
): KeyOrdering => {
  const compareLocales = createLocaleComparator(pinnedLocales);

  return (keys) => [...keys].sort(compareLocales);
};

/** CLDR plural categories, from the smallest quantity to the fallback. */
export const PLURAL_CATEGORY_ORDER = [
  'zero',
  'one',
  'two',
  'few',
  'many',
  'other',
] as const;

/**
 * CLDR order for `plural()`. Unknown keys leave the object untouched.
 */
export const orderPluralCategories: KeyOrdering = (keys) => {
  const categoryRank = new Map<string, number>(
    PLURAL_CATEGORY_ORDER.map((category, index) => [category, index])
  );

  if (!keys.every((key) => categoryRank.has(key))) return undefined;

  return [...keys].sort(
    (keyA, keyB) =>
      (categoryRank.get(keyA) as number) - (categoryRank.get(keyB) as number)
  );
};

const FALLBACK_KEY = 'fallback';

const ENUMERATION_CONDITION_PATTERN = /^(<=|>=|<|>|=)?(-?\d+(?:\.\d+)?)$/;

/** Rank of each operator for one threshold: `<1`, `<=1`, `1`, `>=1`, `>1`. */
const OPERATOR_RANK: Record<string, number> = {
  '<': 0,
  '<=': 1,
  '': 2,
  '=': 2,
  '>=': 3,
  '>': 4,
};

type EnumerationCondition = {
  key: string;
  threshold: number;
  operatorRank: number;
};

const parseEnumerationCondition = (
  key: string
): EnumerationCondition | undefined => {
  const match = ENUMERATION_CONDITION_PATTERN.exec(key);

  if (!match) return undefined;

  return {
    key,
    threshold: Number(match[2]),
    operatorRank: OPERATOR_RANK[match[1] ?? ''],
  };
};

/**
 * Keys in the order the runtime iterates them: JavaScript lists integer-like
 * keys first, ascending, whatever their position in the source.
 */
const toRuntimeKeyOrder = (keys: readonly string[]): string[] =>
  Object.keys(Object.fromEntries(keys.map((key) => [key, true])));

/**
 * Quantities covering every interval the conditions can distinguish: each
 * threshold, the midpoint between two thresholds, and one value beyond each
 * end.
 */
const getProbeQuantities = (
  conditions: readonly EnumerationCondition[]
): number[] => {
  const thresholds = [
    ...new Set(conditions.map((condition) => condition.threshold)),
  ].sort((thresholdA, thresholdB) => thresholdA - thresholdB);

  if (thresholds.length === 0) return [];

  const midpoints = thresholds
    .slice(1)
    .map((threshold, index) => (thresholds[index] + threshold) / 2);

  return [
    thresholds[0] - 1,
    ...thresholds,
    ...midpoints,
    thresholds[thresholds.length - 1] + 1,
  ];
};

const resolvesIdentically = (
  originalKeys: readonly string[],
  reorderedKeys: readonly string[],
  quantities: readonly number[]
): boolean => {
  const toContentState = (keys: readonly string[]) =>
    Object.fromEntries(
      toRuntimeKeyOrder(keys).map((key) => [key, key])
    ) as EnumerationContentState<string>;
  const originalContent = toContentState(originalKeys);
  const reorderedContent = toContentState(reorderedKeys);

  return quantities.every(
    (quantity) =>
      findMatchingCondition(originalContent, quantity) ===
      findMatchingCondition(reorderedContent, quantity)
  );
};

/**
 * Ascending threshold order for `enu()`, `fallback` last.
 *
 * The first matching condition wins at runtime, so the new order is applied
 * only when it selects the same branch for every quantity; overlapping
 * conditions whose priority depends on their position are left untouched.
 */
export const orderEnumerationConditions: KeyOrdering = (keys) => {
  const conditionKeys = keys.filter((key) => key !== FALLBACK_KEY);
  const conditions = conditionKeys.map(parseEnumerationCondition);

  if (conditions.some((condition) => condition === undefined)) {
    return undefined;
  }

  const sortedConditionKeys = (conditions as EnumerationCondition[])
    .sort(
      (conditionA, conditionB) =>
        conditionA.threshold - conditionB.threshold ||
        conditionA.operatorRank - conditionB.operatorRank ||
        compareStrings(conditionA.key, conditionB.key)
    )
    .map((condition) => condition.key);

  if (
    !resolvesIdentically(
      conditionKeys,
      sortedConditionKeys,
      getProbeQuantities(conditions as EnumerationCondition[])
    )
  ) {
    return undefined;
  }

  const fallbackKeys = keys.filter((key) => key === FALLBACK_KEY);

  return [...sortedConditionKeys, ...fallbackKeys];
};

/** Keys `getSelect` falls back to, by name, before the last declared key. */
const SELECT_NAMED_FALLBACK_KEYS = ['fallback', 'other'];

/**
 * Alphabetical order for `select()`, `fallback` last.
 *
 * Without a `fallback` or `other` key, the last key is the implicit fallback,
 * so it stays last and only the keys before it are sorted.
 */
export const orderSelectCases: KeyOrdering = (keys) => {
  const hasNamedFallback = keys.some((key) =>
    SELECT_NAMED_FALLBACK_KEYS.includes(key)
  );
  const runtimeKeys = toRuntimeKeyOrder(keys);
  const pinnedLastKey = hasNamedFallback
    ? keys.includes(FALLBACK_KEY)
      ? FALLBACK_KEY
      : undefined
    : runtimeKeys[runtimeKeys.length - 1];
  const sortedKeys = keys
    .filter((key) => key !== pinnedLastKey)
    .sort(compareStrings);
  const orderedKeys =
    pinnedLastKey === undefined ? sortedKeys : [...sortedKeys, pinnedLastKey];
  const reorderedRuntimeKeys = toRuntimeKeyOrder(orderedKeys);

  // Integer-like keys always iterate first: bail out if that moves the
  // implicit fallback.
  if (
    !hasNamedFallback &&
    reorderedRuntimeKeys[reorderedRuntimeKeys.length - 1] !== pinnedLastKey
  ) {
    return undefined;
  }

  return orderedKeys;
};
