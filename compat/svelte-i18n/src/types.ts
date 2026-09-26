/** Rich-text chunk renderer accepted as an interpolation value. */
export type FormatXMLElementFn<T = unknown> = (
  chunks: (string | T)[]
) => string | T;

/** Named `Intl` option presets, keyed by format name (`'short'`, `'EUR'`…). */
export type Formats = {
  number: Record<string, Intl.NumberFormatOptions>;
  date: Record<string, Intl.DateTimeFormatOptions>;
  time: Record<string, Intl.DateTimeFormatOptions>;
};

export type InterpolationValues =
  | Record<
      string,
      | string
      | number
      | boolean
      | Date
      | FormatXMLElementFn<unknown>
      | null
      | undefined
    >
  | undefined;

export type MessageObject = {
  id: string;
  locale?: string;
  format?: string;
  default?: string;
  values?: InterpolationValues;
};

/** The `$_` / `$t` / `$format` function. */
export type MessageFormatter = (
  id: string | MessageObject,
  options?: Omit<MessageObject, 'id'>
) => string;

export type IntlFormatterOptions<T> = T & {
  format?: string;
  locale?: string;
};

export type TimeFormatter = (
  date: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string;

export type DateFormatter = (
  date: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string;

export type NumberFormatter = (
  value: number,
  options?: IntlFormatterOptions<Intl.NumberFormatOptions>
) => string;

/** The `$json` function: returns the raw message subtree. */
export type JSONGetter = <T = unknown>(
  id: string,
  locale?: string
) => T | undefined;

export type MemoizedIntlFormatterOptional<T, U> = (
  options?: IntlFormatterOptions<U>
) => T;

export type MessagesLoader = () => Promise<
  LocaleDictionary | { default: LocaleDictionary }
>;

export type MissingKeyHandlerInput = {
  locale: string;
  id: string;
  defaultValue: string | undefined;
};

// biome-ignore lint/suspicious/noConfusingVoidType: svelte-i18n's signature accepts handlers returning nothing
export type MissingKeyHandlerOutput = string | void;

export type MissingKeyHandler = (
  input: MissingKeyHandlerInput
) => MissingKeyHandlerOutput;

export type ConfigureOptions = {
  /** The global fallback locale. */
  fallbackLocale: string;
  /** The app initial locale. */
  initialLocale?: string | null;
  /** Custom time / date / number formats, merged over the defaults. */
  formats?: Partial<Formats>;
  /** Kept for API parity: intlayer dictionaries never load asynchronously. */
  loadingDelay?: number;
  /** @deprecated Use `handleMissingMessage` instead. */
  warnOnMissingMessages?: boolean;
  /** Called whenever a message is missing; may return a fallback string. */
  handleMissingMessage?: MissingKeyHandler;
  /** Kept for API parity: tags are always kept as literal text. */
  ignoreTag?: boolean;
};

export type ConfigureOptionsInit = Pick<ConfigureOptions, 'fallbackLocale'> &
  Partial<Omit<ConfigureOptions, 'fallbackLocale'>>;

export type LocaleDictionary = {
  [key: string]:
    | LocaleDictionary
    | string
    | Array<string | LocaleDictionary>
    | null;
};

export type LocalesDictionary = Record<string, LocaleDictionary>;

export type MemoizedNumberFormatterFactoryOptional =
  MemoizedIntlFormatterOptional<Intl.NumberFormat, Intl.NumberFormatOptions>;

export type MemoizedDateTimeFormatterFactoryOptional =
  MemoizedIntlFormatterOptional<
    Intl.DateTimeFormat,
    Intl.DateTimeFormatOptions
  >;
