import { getIntlayer } from '@intlayer/core/interpreter';
import { resolveMessage } from '@intlayer/core/messageFormat';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type {
  AllMessages,
  Locale,
  Locales,
  MessageDescriptor,
  MessageId,
  MessageOptions,
  Messages,
} from '@lingui/core';
import { EventEmitter } from './eventEmitter';

/** Mirrors the unexported `Values` type from `@lingui/core`. */
type Values = Record<string, unknown>;

/** Mirrors the unexported `MessageCompiler` type from `@lingui/core`. */
type MessageCompiler = (message: string) => unknown;

/** Mirrors the unexported `Events` type from `@lingui/core`. */
type LinguiEvents = {
  change: () => void;
  missing: (event: { locale: Locale; id: MessageId }) => void;
};

/** Mirrors the unexported `I18nProps` type from `@lingui/core`. */
type I18nProps = {
  locale?: Locale;
  locales?: Locales;
  messages?: AllMessages;
  missing?: string | ((locale: string, id: string) => string);
};

/**
 * Navigates a nested object by a dot-separated path.
 *
 * Example: `navigatePath({home: {title: 'Hello'}}, 'home.title')` → `'Hello'`
 */
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

/**
 * Looks up a lingui message from the `messages` intlayer dictionary.
 *
 * The entire lingui catalog is stored in a single `messages` dictionary.
 * Dotted IDs (e.g. `'home.title'`) are resolved as nested paths within that
 * dictionary. Hash-style IDs (no dots) are direct top-level keys.
 */
const lookupMessage = (
  id: string,
  locale: LocalesValues
): string | undefined => {
  try {
    const dictionary = getIntlayer('messages' as DictionaryKeys, locale);
    const value = navigatePath(dictionary, id);
    return typeof value === 'string' ? value : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Intlayer-backed implementation of `@lingui/core`'s `I18n` class.
 *
 * - Messages are read from the `messages` intlayer dictionary.
 * - ICU MessageFormat syntax is resolved via `@intlayer/core/messageFormat`.
 * - `load()` / `loadAndActivate()` / `setMessagesCompiler()` are no-ops —
 *   messages are served by intlayer's compiled dictionaries.
 * - `activate(locale)` emits `'change'` so that React consumers re-render.
 */
export class I18nClass extends EventEmitter<LinguiEvents> {
  private _locale: string;
  private _locales?: Locales;

  constructor({ locale = 'en', locales }: I18nProps = {}) {
    super();
    this._locale = typeof locale === 'string' ? locale : 'en';
    this._locales = locales;
  }

  get locale(): string {
    return this._locale;
  }

  get locales(): Locales | undefined {
    return this._locales;
  }

  get messages(): Messages {
    try {
      return getIntlayer(
        'messages' as DictionaryKeys,
        this._locale as LocalesValues
      ) as Messages;
    } catch {
      return {};
    }
  }

  /**
   * No-op: intlayer handles message compilation at build time.
   */
  setMessagesCompiler(_compiler: MessageCompiler): this {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '@intlayer/lingui: i18n.setMessagesCompiler() is a no-op — ' +
          'message compilation is handled at build time by intlayer.'
      );
    }
    return this;
  }

  /**
   * No-op: messages are loaded automatically via intlayer dictionaries.
   */
  load(_localeOrAll: Locale | AllMessages, _messages?: Messages): void {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '@intlayer/lingui: i18n.load() is a no-op — ' +
          'messages are loaded automatically via intlayer dictionaries.'
      );
    }
  }

  /**
   * Activates the given locale (emits `'change'`).
   * The `messages` argument is ignored — intlayer handles the catalog.
   */
  loadAndActivate({
    locale,
    locales,
  }: {
    locale: Locale;
    locales?: Locales;
    messages: Messages;
  }): void {
    this.activate(locale, locales);
  }

  /**
   * Sets the active locale and emits `'change'` to notify React consumers.
   */
  activate(locale: Locale, locales?: Locales): void {
    this._locale = locale;
    this._locales = locales;
    this.emit('change');
  }

  /**
   * Translates a message descriptor or a plain ID.
   *
   * Resolution order:
   * 1. `messages` intlayer dictionary (dotted path navigation)
   * 2. `descriptor.message` or `options.message` (original source string)
   * 3. The raw `id` as fallback
   */
  _(descriptor: MessageDescriptor): string;
  _(id: MessageId, values?: Values, options?: MessageOptions): string;
  _(
    descriptorOrId: MessageDescriptor | MessageId,
    values?: Values,
    options?: MessageOptions
  ): string {
    const isDescriptor =
      typeof descriptorOrId === 'object' && descriptorOrId !== null;
    const id = isDescriptor
      ? (descriptorOrId as MessageDescriptor).id
      : (descriptorOrId as MessageId);
    const defaultMessage = isDescriptor
      ? ((descriptorOrId as MessageDescriptor).message ?? options?.message)
      : options?.message;
    const resolvedValues: Values = isDescriptor
      ? {
          ...((descriptorOrId as MessageDescriptor).values ?? {}),
          ...(values ?? {}),
        }
      : (values ?? {});

    const rawValue = lookupMessage(id, this._locale as LocalesValues);
    const template = rawValue ?? defaultMessage ?? id;

    return (
      resolveMessage(
        template,
        resolvedValues as Record<string, string | number>,
        this._locale as LocalesValues,
        'icu'
      ) ?? id
    );
  }

  /**
   * Alias for `_`. Provided for lingui API compatibility.
   */
  t = (
    descriptorOrId: MessageDescriptor | MessageId,
    values?: Values,
    options?: MessageOptions
  ): string => this._(descriptorOrId as MessageId, values, options);

  /**
   * @deprecated Use `Intl.DateTimeFormat` directly.
   */
  date(
    value?: string | Date | number,
    format?: Intl.DateTimeFormatOptions
  ): string {
    if (value === undefined || value === null) return '';
    const dateValue =
      value instanceof Date
        ? value
        : new Date(typeof value === 'string' ? value : value);
    return new Intl.DateTimeFormat(this._locale, format).format(dateValue);
  }

  /**
   * @deprecated Use `Intl.NumberFormat` directly.
   */
  number(value: number | bigint, format?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this._locale, format).format(value);
  }
}
