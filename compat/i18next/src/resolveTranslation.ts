import { getIntlayer } from '@intlayer/core/interpreter';
import {
  type MessageValues,
  navigatePath,
  resolveMessage,
} from '@intlayer/core/messageFormat';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';

/**
 * Shared i18next-dialect translation resolution.
 *
 * Implements the i18next lookup pipeline on top of intlayer dictionaries:
 * namespace prefix (`ns:key`), `ns` option override, plural suffixes
 * (`key_one`, `key_other`, …) via `Intl.PluralRules`, context suffixes
 * (`key_male`), `$t()` nesting, `defaultValue` and `{{var}}` interpolation.
 *
 * Used by `@intlayer/i18next` (instance `t`) and `@intlayer/react-i18next`
 * (`useTranslation`, `<Trans>`).
 */

/** Option keys that are control flags, never interpolation values. */
const CONTROL_OPTION_KEYS = new Set([
  'defaultValue',
  'ns',
  'lng',
  'lngs',
  'fallbackLng',
  'returnObjects',
  'returnDetails',
  'keySeparator',
  'nsSeparator',
  'ordinal',
  'postProcess',
  'postProcessPassResolved',
  'interpolation',
  'replace',
  'joinArrays',
  'nsMode',
  'keyPrefix',
]);

/** Maximum `$t()` nesting recursion depth. */
const MAX_NESTING_DEPTH = 5;

/**
 * Builds the ordered list of key candidates following i18next's resolution
 * order: context + plural → context → plural → exact key.
 */
const buildKeyCandidates = (
  path: string,
  locale: string,
  count: number | undefined,
  context: string | undefined,
  ordinal: boolean
): string[] => {
  const candidates: string[] = [];

  const pluralCategory =
    count === undefined
      ? undefined
      : new Intl.PluralRules(locale, {
          type: ordinal ? 'ordinal' : 'cardinal',
        }).select(count);

  if (context) {
    if (pluralCategory) {
      if (ordinal) {
        candidates.push(`${path}_${context}_ordinal_${pluralCategory}`);
      }
      candidates.push(`${path}_${context}_${pluralCategory}`);
      if (count !== 1) candidates.push(`${path}_${context}_plural`);
    }
    candidates.push(`${path}_${context}`);
  }

  if (pluralCategory) {
    if (ordinal) candidates.push(`${path}_ordinal_${pluralCategory}`);
    candidates.push(`${path}_${pluralCategory}`);
    // Legacy i18next v3 JSON suffix
    if (count !== 1) candidates.push(`${path}_plural`);
  }

  candidates.push(path);

  return candidates;
};

/** Extracts interpolation values from i18next `t()` options. */
export const getInterpolationValues = (options?: TOptions): MessageValues => {
  if (!options || typeof options !== 'object') return {};

  const replace = (options as { replace?: MessageValues }).replace;
  if (replace) {
    // `count` and `context` are always interpolatable, even with `replace`
    const values: MessageValues = { ...replace };
    if (options.count !== undefined) values.count ??= options.count;
    if (options.context !== undefined) values.context ??= options.context;
    return values;
  }

  const values: MessageValues = {};
  for (const [optionKey, optionValue] of Object.entries(options)) {
    if (!CONTROL_OPTION_KEYS.has(optionKey)) values[optionKey] = optionValue;
  }
  return values;
};

export type ResolveTranslationParams = {
  /** Locale to resolve against. */
  locale: LocalesValues;
  /** Default namespace (dictionary key) when the key has no `ns:` prefix. */
  namespace: string;
  /** The translation key, possibly `ns:path.to.key`. */
  key: string;
  /** i18next `t()` options (interpolation values, count, context, …). */
  options?: TOptions;
  /** Custom key separator (`init({ keySeparator })`). */
  keySeparator?: string | false;
  /** Custom namespace separator (`init({ nsSeparator })`). */
  nsSeparator?: string | false;
  /** Internal `$t()` nesting recursion depth. */
  depth?: number;
  /**
   * Pre-resolved content of the `namespace` dictionary for `locale`.
   *
   * Supplied by the build-optimized `useDictionary` / `getDictionary`
   * variants, where the dictionary is imported at build time instead of read
   * from the runtime registry. Only used when the call resolves to the
   * default `namespace` without a locale override — cross-namespace
   * (`other:key`, `{ ns }`) and `{ lng }` lookups still go through
   * `getIntlayer`.
   */
  dictionaryContent?: unknown;
};

/**
 * Resolves a single translation key the i18next way against intlayer
 * dictionaries.
 *
 * Returns the resolved value: a string in the common case, or an
 * object/array when `returnObjects: true`. Returns `undefined` when the key
 * cannot be resolved (caller decides between `defaultValue`, fallback keys
 * and key echo).
 */
export const resolveTranslation = ({
  locale,
  namespace,
  key,
  options,
  keySeparator = '.',
  nsSeparator = ':',
  depth = 0,
  dictionaryContent,
}: ResolveTranslationParams): unknown => {
  // Namespace resolution: `ns:` prefix > `ns` option > default namespace
  let targetNamespace = namespace;
  let path = key;

  if (nsSeparator !== false && key.includes(nsSeparator)) {
    const separatorIndex = key.indexOf(nsSeparator);
    targetNamespace = key.slice(0, separatorIndex);
    path = key.slice(separatorIndex + nsSeparator.length);
  } else if (options?.ns) {
    targetNamespace = Array.isArray(options.ns)
      ? (options.ns[0] as string)
      : (options.ns as string);
  }

  const count = typeof options?.count === 'number' ? options.count : undefined;
  const context =
    options?.context !== undefined ? String(options.context) : undefined;
  const ordinal = options?.ordinal === true;

  let dictionary: unknown;
  if (
    dictionaryContent !== undefined &&
    targetNamespace === namespace &&
    options?.lng === undefined
  ) {
    dictionary = dictionaryContent;
  } else {
    try {
      dictionary = getIntlayer(
        targetNamespace as DictionaryKeys,
        ((options?.lng as string) ?? locale) as LocalesValues
      );
    } catch {
      return undefined;
    }
  }

  let resolvedValue: unknown;
  for (const candidate of buildKeyCandidates(
    path,
    (options?.lng as string) ?? (locale as string),
    count,
    context,
    ordinal
  )) {
    const value = navigatePath(dictionary, candidate, keySeparator);
    if (value !== null && value !== undefined) {
      resolvedValue = value;
      break;
    }
  }

  if (resolvedValue === null || resolvedValue === undefined) return undefined;

  // `returnObjects: true` — return the raw subtree
  if (
    options?.returnObjects &&
    typeof resolvedValue === 'object' &&
    resolvedValue !== null
  ) {
    return resolvedValue;
  }

  const values = getInterpolationValues(options);

  let resolved = resolveMessage(
    resolvedValue,
    values,
    ((options?.lng as string) ?? locale) as LocalesValues,
    'i18next'
  );

  // `$t(key)` nesting
  if (depth < MAX_NESTING_DEPTH && resolved.includes('$t(')) {
    resolved = resolved.replace(
      /\$t\(\s*([^),]+?)\s*(?:,[^)]*)?\)/g,
      (match, nestedKey: string) => {
        const nestedValue = resolveTranslation({
          locale,
          namespace: targetNamespace,
          key: nestedKey.trim(),
          options,
          keySeparator,
          nsSeparator,
          depth: depth + 1,
          dictionaryContent:
            targetNamespace === namespace ? dictionaryContent : undefined,
        });
        return typeof nestedValue === 'string' ? nestedValue : match;
      }
    );
  }

  return resolved;
};
