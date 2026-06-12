import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';
import { getCachedIntl } from '../formatters';
import { getEnumeration } from '../interpreter/getEnumeration';
import { getPlural } from '../interpreter/getPlural';
import type { PluralContentState } from '../transpiler/plural/plural';
import { icuToIntlayerFormatter } from './ICU';
import { i18nextToIntlayerFormatter } from './i18next';
import { vueI18nToIntlayerFormatter } from './vue-i18n';

/**
 * Runtime counterpart of the `messageFormat` converters.
 *
 * The converters (`icuToIntlayerFormatter`, `i18nextToIntlayerFormatter`,
 * `vueI18nToIntlayerFormatter`) turn library-specific message syntax into
 * intlayer nodes (`insert`, `plural`, `enu`, `gender`, `html`). This module
 * resolves those nodes — or raw message strings — into a final string using
 * the provided interpolation values and locale.
 *
 * It is the mutualized resolution engine used by the compat adapter packages
 * (`@intlayer/i18next`, `@intlayer/next-intl`, `@intlayer/vue-i18n`, …).
 */

/** Message syntax dialect of the source i18n library. */
export type MessageFormatDialect = 'icu' | 'i18next' | 'vue-i18n';

/** Interpolation values passed alongside a translation lookup. */
export type MessageValues = Record<string, unknown>;

/** Internal enumeration metadata keys injected by the converters. */
const ENUMERATION_METADATA_KEYS = [
  '__intlayer_icu_var',
  '__intlayer_icu_ordinal',
  '__intlayer_vue_i18n_var',
] as const;

/**
 * Resolves a possibly-dotted path (`user.name`) inside the values object.
 */
const resolveValuePath = (values: MessageValues, path: string): unknown => {
  if (path in values) return values[path];

  let current: unknown = values;
  for (const part of path.split('.')) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/** Formats an ICU-style formatted argument (`{value, number, percent}`). */
const formatArgument = (
  value: unknown,
  type: string,
  style: string | undefined,
  locale: LocalesValues
): string => {
  try {
    if (type === 'number') {
      const numberValue = Number(value);
      if (style === 'percent') {
        return getCachedIntl(Intl.NumberFormat, locale, {
          style: 'percent',
        }).format(numberValue);
      }
      if (style === 'integer') {
        return getCachedIntl(Intl.NumberFormat, locale, {
          maximumFractionDigits: 0,
        }).format(numberValue);
      }
      return getCachedIntl(Intl.NumberFormat, locale).format(numberValue);
    }

    if (type === 'date' || type === 'time') {
      const dateValue =
        value instanceof Date ? value : new Date(value as string | number);
      const dateTimeStyle = (
        ['short', 'medium', 'long', 'full'].includes(style ?? '')
          ? style
          : type === 'date'
            ? 'medium'
            : 'short'
      ) as 'short' | 'medium' | 'long' | 'full';

      return getCachedIntl(
        Intl.DateTimeFormat,
        locale,
        type === 'date'
          ? { dateStyle: dateTimeStyle }
          : { timeStyle: dateTimeStyle }
      ).format(dateValue);
    }
  } catch {
    // Fall through to the raw string representation below
  }

  return String(value);
};

/**
 * Interpolates a message template with values.
 *
 * Handles, in order:
 * 1. Intlayer insertions `{{name}}` (whitespace-tolerant, dotted paths)
 * 2. ICU formatted arguments `{value, number}` / `{ts, date, long}`
 * 3. Bare single-brace arguments `{name}` (ICU / vue-i18n simple args)
 */
export const interpolateMessage = (
  template: string,
  values: MessageValues = {},
  locale: LocalesValues = 'en' as LocalesValues
): string =>
  template
    .replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (match, path: string) => {
      const value = resolveValuePath(values, path);
      return value === undefined ? match : String(value);
    })
    .replace(
      /\{\s*([\w.]+)\s*,\s*(\w+)\s*(?:,\s*([^}]+?)\s*)?\}/g,
      (match, path: string, type: string, style: string | undefined) => {
        const value = resolveValuePath(values, path);
        if (value === undefined) return match;
        return formatArgument(value, type, style, locale);
      }
    )
    .replace(/\{\s*([\w.]+)\s*\}/g, (match, path: string) => {
      const value = resolveValuePath(values, path);
      return value === undefined ? match : String(value);
    });

/** Reads the selector value of an enumeration/plural node from the values. */
const getSelectorValue = (
  values: MessageValues,
  variableName: string
): unknown => values[variableName] ?? values.count ?? values.n;

/**
 * Resolves an intlayer message node tree (as produced by the
 * `*ToIntlayerFormatter` converters, or already present in a built
 * dictionary) into its final value using interpolation values and locale.
 *
 * Function nodes (produced by the interpreter plugins for `insertion`,
 * `enumeration` and `plural` content) are invoked with the values.
 */
export const resolveMessageNode = (
  node: unknown,
  values: MessageValues = {},
  locale: LocalesValues = 'en' as LocalesValues
): unknown => {
  if (node === null || node === undefined) return node;

  if (typeof node === 'string') {
    return interpolateMessage(node, values, locale);
  }

  if (typeof node === 'number' || typeof node === 'boolean') {
    return String(node);
  }

  // Interpreter-transformed nodes (insertion/enumeration/plural plugins)
  // are exposed as callables taking the interpolation values.
  if (typeof node === 'function') {
    try {
      return resolveMessageNode(
        (node as (arg: MessageValues) => unknown)(values),
        values,
        locale
      );
    } catch {
      return undefined;
    }
  }

  if (Array.isArray(node)) {
    return node
      .map((item) => String(resolveMessageNode(item, values, locale) ?? ''))
      .join('');
  }

  const typedNode = node as Record<string, unknown> & { nodeType?: string };

  if (typedNode.nodeType === NodeTypes.INSERTION) {
    return resolveMessageNode(typedNode[NodeTypes.INSERTION], values, locale);
  }

  if (typedNode.nodeType === NodeTypes.HTML) {
    // Tags are kept intact — rich rendering is handled by the caller
    return resolveMessageNode(typedNode[NodeTypes.HTML], values, locale);
  }

  if (typedNode.nodeType === NodeTypes.PLURAL) {
    const pluralState = typedNode[
      NodeTypes.PLURAL
    ] as PluralContentState<unknown>;
    const count = Number(getSelectorValue(values, 'count') ?? 1);
    const selected = getPlural(
      pluralState as PluralContentState<string>,
      count,
      locale
    );
    return resolveMessageNode(selected, values, locale);
  }

  if (typedNode.nodeType === NodeTypes.ENUMERATION) {
    const enumerationState = typedNode[NodeTypes.ENUMERATION] as Record<
      string,
      unknown
    >;

    const variableName = (ENUMERATION_METADATA_KEYS.map(
      (metadataKey) => enumerationState[metadataKey]
    ).find((name) => typeof name === 'string') ?? 'count') as string;

    const isOrdinal = enumerationState.__intlayer_icu_ordinal === true;

    const options: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(enumerationState)) {
      if (!(ENUMERATION_METADATA_KEYS as readonly string[]).includes(key)) {
        options[key] = value;
      }
    }

    const selector = getSelectorValue(values, variableName);

    let selected: unknown;
    if (isOrdinal && !Number.isNaN(Number(selector))) {
      // ICU `selectordinal` — exact numeric match first, then the CLDR
      // ordinal category, then the fallback
      const ordinalCount = Number(selector);
      const ordinalCategory = getCachedIntl(Intl.PluralRules, locale, {
        type: 'ordinal',
      }).select(ordinalCount);
      selected =
        options[String(ordinalCount)] ??
        options[ordinalCategory] ??
        options.fallback ??
        options.other;
    } else if (
      typeof selector === 'number' ||
      !Number.isNaN(Number(selector))
    ) {
      selected = getEnumeration(options, Number(selector));
    } else {
      // String selector — ICU `select` converted to an enumeration
      selected = options[String(selector)] ?? options.fallback ?? options.other;
    }

    return resolveMessageNode(selected, values, locale);
  }

  if (typedNode.nodeType === NodeTypes.GENDER) {
    const genderState = typedNode[NodeTypes.GENDER] as Record<string, unknown>;
    const genderValue = String(values.gender ?? '');
    const selected =
      genderState[genderValue] ?? genderState.fallback ?? genderState.other;
    return resolveMessageNode(selected, values, locale);
  }

  return node;
};

const DIALECT_FORMATTERS: Record<
  MessageFormatDialect,
  (message: string) => unknown
> = {
  icu: (message) => icuToIntlayerFormatter(message),
  i18next: (message) => i18nextToIntlayerFormatter(message),
  'vue-i18n': (message) => vueI18nToIntlayerFormatter(message),
};

/**
 * Resolves a raw message — string in a library dialect, or an intlayer node
 * tree — into a final string using interpolation values and locale.
 *
 * @example
 * ```ts
 * resolveMessage('Hello {name}', { name: 'John' }, 'en', 'icu');
 * // 'Hello John'
 *
 * resolveMessage(
 *   '{count, plural, one {# item} other {# items}}',
 *   { count: 3 },
 *   'en',
 *   'icu'
 * );
 * // '3 items'
 * ```
 */
export const resolveMessage = (
  message: unknown,
  values: MessageValues = {},
  locale: LocalesValues = 'en' as LocalesValues,
  dialect: MessageFormatDialect = 'icu'
): string => {
  const node =
    typeof message === 'string'
      ? DIALECT_FORMATTERS[dialect](message)
      : message;

  const resolved = resolveMessageNode(node, values, locale);

  return typeof resolved === 'string' ? resolved : String(resolved ?? '');
};

/** A parsed token of a tagged message: plain text or a tag with children. */
export type TaggedMessageToken =
  | string
  | { tag: string; children: TaggedMessageToken[] };

/**
 * Tokenizes a message containing XML-like tags (`'Visit <link>the docs</link>'`,
 * `'hello <1>{{name}}</1>'`, `'line<br/>break'`) into a token tree.
 *
 * Used by rich-text renderers (`t.rich`, `<Trans components>`,
 * `<i18n-t>` slots) to map tags to framework elements.
 */
export const parseTaggedMessage = (message: string): TaggedMessageToken[] => {
  const tokens: TaggedMessageToken[] = [];
  const tagRegex = /<([\w-]+)\s*\/>|<([\w-]+)[^>]*>([\s\S]*?)<\/\2>/g;
  let lastIndex = 0;
  let match = tagRegex.exec(message);

  while (match !== null) {
    if (match.index > lastIndex) {
      tokens.push(message.slice(lastIndex, match.index));
    }

    const [, selfClosingTag, tag, inner] = match;

    if (selfClosingTag) {
      tokens.push({ tag: selfClosingTag, children: [] });
    } else {
      tokens.push({ tag, children: parseTaggedMessage(inner) });
    }

    lastIndex = match.index + match[0].length;
    match = tagRegex.exec(message);
  }

  if (lastIndex < message.length) {
    tokens.push(message.slice(lastIndex));
  }

  return tokens;
};
