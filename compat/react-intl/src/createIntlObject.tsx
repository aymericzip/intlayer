import { getIntlayer } from '@intlayer/core/interpreter';
import {
  type MessageValues,
  parseTaggedMessage,
  resolveMessage,
  type TaggedMessageToken,
} from '@intlayer/core/messageFormat';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { Fragment, type ReactNode } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

type RichRenderer = (chunks: ReactNode) => ReactNode;

/** Splits a full dotted id into the dictionary key and remaining path. */
const splitId = (id: string): { dictionaryKey: string; path: string } => {
  const dotIndex = id.indexOf('.');
  if (dotIndex === -1) return { dictionaryKey: id, path: '' };
  return {
    dictionaryKey: id.slice(0, dotIndex),
    path: id.slice(dotIndex + 1),
  };
};

const navigatePath = (object: unknown, path: string): unknown => {
  if (!path) return object;
  const parts = path.split('.');
  let current: unknown = object;
  for (const part of parts) {
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

/** Looks up a message value by full dotted id; first segment = dictionary key. */
const lookupMessage = (id: string, locale: LocalesValues): unknown => {
  const { dictionaryKey, path } = splitId(id);
  if (!dictionaryKey) return undefined;
  try {
    const dictionary = getIntlayer(dictionaryKey as DictionaryKeys, locale);
    return navigatePath(dictionary, path);
  } catch {
    return undefined;
  }
};

/** Maps tagged tokens to React nodes using the provided renderer functions. */
const renderRichTokens = (
  tokens: TaggedMessageToken[],
  renderers: Record<string, unknown>
): ReactNode[] =>
  tokens.map((token, tokenIndex) => {
    if (typeof token === 'string') return token;
    const children = renderRichTokens(token.children, renderers);
    const renderer = renderers[token.tag];
    if (typeof renderer === 'function') {
      return (
        <Fragment key={tokenIndex}>
          {(renderer as RichRenderer)(<>{children}</>)}
        </Fragment>
      );
    }
    return <Fragment key={tokenIndex}>{children}</Fragment>;
  });

/** Partitions values into scalar interpolation params and tag renderers. */
const splitRichValues = (
  values: Record<string, unknown>
): { scalarValues: MessageValues; renderers: Record<string, unknown> } => {
  const scalarValues: MessageValues = {};
  const renderers: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'function') renderers[key] = value;
    else scalarValues[key] = value as MessageValues[string];
  }
  return { scalarValues, renderers };
};

const isRichValues = (values: Record<string, unknown>): boolean =>
  Object.values(values).some((value) => typeof value === 'function');

/**
 * Builds an intlayer-backed `IntlShape` object for the given locale.
 *
 * - Translation ids use the first dot-path segment as the dictionary key.
 * - Full ICU MessageFormat syntax is supported via `@intlayer/core/messageFormat`.
 * - Rich text tags (`<b>chunks</b>`) are resolved through render functions in `values`.
 */
export const createIntlObject = (locale: LocalesValues): IntlShape => {
  const localeString = locale as string;

  const formatMessage = (
    descriptor: MessageDescriptor,
    values?: Record<string, unknown>
  ): string | ReactNode[] => {
    const { id = '', defaultMessage } = descriptor;
    const rawValue = lookupMessage(id, locale);
    const messageTemplate =
      rawValue !== undefined && rawValue !== null
        ? (rawValue as string)
        : typeof defaultMessage === 'string'
          ? defaultMessage
          : id;

    if (!values || !isRichValues(values)) {
      return (
        resolveMessage(
          messageTemplate,
          (values ?? {}) as MessageValues,
          locale,
          'icu'
        ) ?? id
      );
    }

    const { scalarValues, renderers } = splitRichValues(values);
    const message =
      resolveMessage(messageTemplate, scalarValues, locale, 'icu') ?? id;
    return renderRichTokens(parseTaggedMessage(message), renderers);
  };

  const toDate = (value: Date | number | string): Date =>
    value instanceof Date ? value : new Date(value);

  const formatDate = (
    value: string | number | Date | undefined,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    if (value === undefined || value === null) return '';
    return new Intl.DateTimeFormat(localeString, options).format(toDate(value));
  };

  const formatNumber = (
    value: number | bigint,
    options?: Intl.NumberFormatOptions
  ): string => new Intl.NumberFormat(localeString, options).format(value);

  const formatPlural = (
    value: number,
    options?: Intl.PluralRulesOptions
  ): Intl.LDMLPluralRule =>
    new Intl.PluralRules(localeString, options).select(value);

  const formatList = (
    list: Iterable<unknown> | readonly unknown[],
    options?: Intl.ListFormatOptions
  ): string => {
    const strings = Array.from(list).filter(
      (item): item is string => typeof item === 'string'
    );
    return new Intl.ListFormat(localeString, options).format(strings);
  };

  const formatListToParts = (
    list: Iterable<unknown> | readonly unknown[],
    options?: Intl.ListFormatOptions
  ): ReturnType<Intl.ListFormat['formatToParts']> => {
    const strings = Array.from(list).filter(
      (item): item is string => typeof item === 'string'
    );
    return new Intl.ListFormat(localeString, options).formatToParts(strings);
  };

  const formatDisplayName = (
    value: string,
    options?: Intl.DisplayNamesOptions
  ): string | undefined =>
    new Intl.DisplayNames([localeString], options ?? { type: 'language' }).of(
      value
    );

  const formatRelativeTime = (
    value: number,
    unit?: Intl.RelativeTimeFormatUnit,
    options?: Intl.RelativeTimeFormatOptions
  ): string =>
    new Intl.RelativeTimeFormat(localeString, {
      numeric: 'auto',
      ...options,
    }).format(value, unit ?? 'second');

  const formatDateTimeRange = (
    from: Date | number,
    to: Date | number,
    options?: Intl.DateTimeFormatOptions
  ): string =>
    new Intl.DateTimeFormat(localeString, options).formatRange(
      toDate(from),
      toDate(to)
    );

  const formatDateToParts = (
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    options?: Intl.DateTimeFormatOptions
  ): Intl.DateTimeFormatPart[] =>
    new Intl.DateTimeFormat(localeString, options).formatToParts(
      typeof value === 'string' ? new Date(value) : value
    );

  const formatNumberToParts = (
    value: number | bigint,
    options?: Intl.NumberFormatOptions
  ): Intl.NumberFormatPart[] =>
    new Intl.NumberFormat(localeString, options).formatToParts(value);

  /** Alias of `formatMessage` — provided for `@formatjs/intl` v4 compatibility. */
  const $t = formatMessage as IntlShape['$t'];

  return {
    locale: localeString,
    defaultLocale: localeString,
    messages: {},
    formats: {},
    defaultFormats: {},
    timeZone: undefined,
    textComponent: Fragment,
    wrapRichTextChunksInFragment: false,
    fallbackOnEmptyString: true,
    onError: () => {},
    onWarn: () => {},
    formatters: {} as IntlShape['formatters'],
    formatMessage: formatMessage as IntlShape['formatMessage'],
    $t,
    formatDate,
    formatTime: formatDate,
    formatNumber,
    formatPlural,
    formatList: formatList as IntlShape['formatList'],
    formatListToParts: formatListToParts as IntlShape['formatListToParts'],
    formatDisplayName: formatDisplayName as IntlShape['formatDisplayName'],
    formatRelativeTime,
    formatDateTimeRange,
    formatDateToParts: formatDateToParts as IntlShape['formatDateToParts'],
    formatTimeToParts: formatDateToParts as IntlShape['formatTimeToParts'],
    formatNumberToParts:
      formatNumberToParts as IntlShape['formatNumberToParts'],
  } as unknown as IntlShape;
};
