import { configDefaultLocale, runtimeOptions } from './configuration';
import type {
  IntlFormatterOptions,
  MemoizedDateTimeFormatterFactoryOptional,
  MemoizedNumberFormatterFactoryOptional,
} from './types';

const numberFormatters = new Map<string, Intl.NumberFormat>();
const dateTimeFormatters = new Map<string, Intl.DateTimeFormat>();

/** Cache key of one formatter: locale plus its serialised options. */
const toCacheKey = (locale: string, options: object): string =>
  `${locale}|${JSON.stringify(options)}`;

/**
 * Splits svelte-i18n formatter options into the target locale and the `Intl`
 * options, expanding a named `format` preset from `runtimeOptions.formats`.
 */
const resolveIntlOptions = <T extends object>(
  options: IntlFormatterOptions<T> | undefined,
  presets: Record<string, T>,
  defaultFormat?: string
): { locale: string; intlOptions: T } => {
  const {
    format: formatName = defaultFormat,
    locale = configDefaultLocale,
    ...intlOptions
  } = options ?? ({} as IntlFormatterOptions<T>);

  const preset = formatName ? presets[formatName] : undefined;

  if (formatName && !preset) {
    throw new Error(`[svelte-i18n] Unknown format "${formatName}"`);
  }

  return {
    locale,
    intlOptions: { ...preset, ...(intlOptions as T) },
  };
};

/** Memoized `Intl.NumberFormat` honouring named `number` formats. */
export const getNumberFormatter: MemoizedNumberFormatterFactoryOptional = (
  options
) => {
  const { locale, intlOptions } = resolveIntlOptions(
    options,
    runtimeOptions.formats.number
  );
  const cacheKey = toCacheKey(locale, intlOptions);

  let formatter = numberFormatters.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, intlOptions);
    numberFormatters.set(cacheKey, formatter);
  }
  return formatter;
};

const createDateTimeFormatterFactory =
  (
    kind: 'date' | 'time',
    defaultFormat: string
  ): MemoizedDateTimeFormatterFactoryOptional =>
  (options) => {
    // Explicit Intl fields replace the default preset, like svelte-i18n.
    const hasExplicitFields =
      options !== undefined &&
      Object.keys(options).some((key) => key !== 'locale' && key !== 'format');

    const { locale, intlOptions } = resolveIntlOptions(
      options,
      runtimeOptions.formats[kind],
      hasExplicitFields ? undefined : defaultFormat
    );
    const cacheKey = toCacheKey(`${kind}:${locale}`, intlOptions);

    let formatter = dateTimeFormatters.get(cacheKey);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(locale, intlOptions);
      dateTimeFormatters.set(cacheKey, formatter);
    }
    return formatter;
  };

/** Memoized `Intl.DateTimeFormat` honouring named `date` formats. */
export const getDateFormatter = createDateTimeFormatterFactory('date', 'short');

/** Memoized `Intl.DateTimeFormat` honouring named `time` formats. */
export const getTimeFormatter = createDateTimeFormatterFactory('time', 'short');
