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
import { linguiMessageToIcu, navigateCatalog } from './linguiCatalog';

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
 * Looks up a lingui message from the `messages` intlayer dictionary.
 *
 * The entire lingui catalog is stored in a single `messages` dictionary.
 * Both flat dotted ids (`'results-table.bundleSize'`, lingui's own format)
 * and genuinely nested paths (`'home.title'`) are supported.
 */
const lookupDictionaryMessage = (
  id: string,
  locale: LocalesValues
): string | undefined => {
  try {
    const dictionary = getIntlayer('messages' as DictionaryKeys, locale);
    const value = navigateCatalog(dictionary, id);
    return value === undefined ? undefined : linguiMessageToIcu(value);
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
  /**
   * Per-locale catalogs supplied at runtime via the constructor, `load()` or
   * `loadAndActivate()`. Used as a fallback when a key is absent from the
   * compiled intlayer `messages` dictionary, so an unmodified lingui codebase
   * (which loads its compiled `.mjs`/`.json` catalogs) keeps working as a
   * drop-in. For optimal bundle size, compile catalogs into intlayer
   * dictionaries instead — see the dev warning emitted by `load()`.
   */
  private _catalogs: Record<string, Messages> = {};
  private _loadFallbackWarned = false;

  constructor({ locale = 'en', locales, messages }: I18nProps = {}) {
    super();
    this._locale = typeof locale === 'string' ? locale : 'en';
    this._locales = locales;
    if (messages) this.mergeAllCatalogs(messages);
  }

  get locale(): string {
    return this._locale;
  }

  get locales(): Locales | undefined {
    return this._locales;
  }

  get messages(): Messages {
    let dictionary: Messages = {};
    try {
      dictionary = getIntlayer(
        'messages' as DictionaryKeys,
        this._locale as LocalesValues
      ) as Messages;
    } catch {
      dictionary = {};
    }
    // The compiled dictionary wins over the runtime fallback catalog.
    return { ...(this._catalogs[this._locale] ?? {}), ...dictionary };
  }

  /** Merges a single-locale catalog into the in-memory fallback store. */
  private mergeLocaleCatalog(locale: string, catalog: Messages) {
    this._catalogs[locale] = { ...this._catalogs[locale], ...catalog };
  }

  /**
   * Merges a `{ [locale]: catalog }` map (lingui's `AllMessages`) into the
   * in-memory fallback store.
   */
  private mergeAllCatalogs(messages: AllMessages) {
    for (const [locale, catalog] of Object.entries(messages)) {
      if (catalog && typeof catalog === 'object') {
        this.mergeLocaleCatalog(locale, catalog as Messages);
      }
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
   * Loads message catalogs into the runtime fallback store, supporting both
   * lingui signatures: `load(locale, messages)` and `load(allMessages)`.
   *
   * These messages are a compatibility fallback — keys present in the compiled
   * intlayer `messages` dictionary take precedence, and only those keys can be
   * pruned/optimized at build time.
   */
  load(localeOrAll: Locale | AllMessages, messages?: Messages): void {
    if (typeof localeOrAll === 'string') {
      this.mergeLocaleCatalog(localeOrAll, messages ?? {});
    } else {
      this.mergeAllCatalogs(localeOrAll);
    }

    if (process.env.NODE_ENV === 'development' && !this._loadFallbackWarned) {
      this._loadFallbackWarned = true;
      console.warn(
        '@intlayer/lingui: i18n.load() messages are used as a runtime ' +
          'fallback. For optimal bundle size, compile your catalogs into ' +
          'intlayer dictionaries instead of importing lingui locale files.'
      );
    }
  }

  /**
   * Loads the given catalog (fallback store) and activates the locale
   * (emits `'change'`).
   */
  loadAndActivate({
    locale,
    locales,
    messages,
  }: {
    locale: Locale;
    locales?: Locales;
    messages?: Messages;
  }): void {
    if (messages) this.mergeLocaleCatalog(locale, messages);
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
   * Resolves the raw message template for an id (before interpolation).
   *
   * Resolution order:
   * 1. compiled intlayer `messages` dictionary
   * 2. runtime fallback catalog (constructor / `load()` / `loadAndActivate()`)
   */
  private resolveTemplate(id: string): string | undefined {
    const fromDictionary = lookupDictionaryMessage(
      id,
      this._locale as LocalesValues
    );
    if (fromDictionary !== undefined) return fromDictionary;

    const catalog = this._catalogs[this._locale];
    if (catalog) {
      const raw = navigateCatalog(catalog, id);
      if (raw !== undefined) return linguiMessageToIcu(raw);
    }

    return undefined;
  }

  /**
   * Translates a message descriptor or a plain ID.
   *
   * Resolution order:
   * 1. `messages` intlayer dictionary (flat dotted key or nested path)
   * 2. runtime fallback catalog loaded via `load()` / `loadAndActivate()`
   * 3. `descriptor.message` or `options.message` (original source string)
   * 4. The raw `id` as fallback
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

    const rawValue = this.resolveTemplate(id);
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
