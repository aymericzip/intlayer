export type FormatXMLElementFn<T = unknown> = (...args: any[]) => T;
export type Formats = Record<string, any>;

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

export interface MessageObject {
  id: string;
  locale?: string;
  format?: string;
  default?: string;
  values?: InterpolationValues;
}

export type MessageFormatter = (
  id: string | MessageObject,
  options?: Omit<MessageObject, 'id'>
) => string;

export type TimeFormatter = (
  d: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string;

export type DateFormatter = (
  d: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string;

export type NumberFormatter = (
  d: number,
  options?: IntlFormatterOptions<Intl.NumberFormatOptions>
) => string;

export type IntlFormatterOptions<T> = T & {
  format?: string;
  locale?: string;
};

export type MemoizedIntlFormatterOptional<T, U> = (
  options?: IntlFormatterOptions<U>
) => T;

export type MessagesLoader = () => Promise<any>;

export type MissingKeyHandlerInput = {
  locale: string;
  id: string;
  defaultValue: string | undefined;
};

export type MissingKeyHandlerOutput = string | undefined;
export type MissingKeyHandler = (
  input: MissingKeyHandlerInput
) => MissingKeyHandlerOutput;

export interface ConfigureOptions {
  /** The global fallback locale */
  fallbackLocale: string;
  /** The app initial locale */
  initialLocale?: string | null;
  /** Custom time/date/number formats */
  formats?: Formats;
  /** Loading delay interval */
  loadingDelay?: number;
  /**
   * @deprecated Use `handleMissingMessage` instead.
   */
  warnOnMissingMessages?: boolean;
  /**
   * Optional method that is executed whenever a message is missing.
   * It may return a string to use as the fallback.
   */
  handleMissingMessage?: MissingKeyHandler;
  /**
   * Whether to treat HTML/XML tags as string literal instead of parsing them as tag token.
   */
  ignoreTag?: boolean;
}

export type ConfigureOptionsInit = Pick<ConfigureOptions, 'fallbackLocale'> &
  Partial<Omit<ConfigureOptions, 'fallbackLocale'>>;

export interface LocaleDictionary {
  [key: string]:
    | LocaleDictionary
    | string
    | Array<string | LocaleDictionary>
    | null;
}

export type LocalesDictionary = {
  [key: string]: LocaleDictionary;
};

export type MemoizedNumberFormatterFactoryOptional =
  MemoizedIntlFormatterOptional<Intl.NumberFormat, Intl.NumberFormatOptions>;
export type MemoizedDateTimeFormatterFactoryOptional =
  MemoizedIntlFormatterOptional<
    Intl.DateTimeFormat,
    Intl.DateTimeFormatOptions
  >;
