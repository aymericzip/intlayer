import { internationalization } from '@intlayer/config/built';
import {
  createMessageResolver,
  icuToIntlayerFormatter,
  type MessageArgumentFormatters,
  resolveMessageNodeToString,
} from '@intlayer/core/messageFormat';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
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
import type { DateTimeFormatValue, NumberFormatValue } from './formats';
import {
  linguiMessageToIcu,
  navigateLinguiCatalog,
  unwrapLinguiCatalog,
} from './linguiCatalog';
import type { RegistryResolver } from './registryLookup';

/**
 * ICU-bound `resolveMessage`, for the messages that reach the class as *raw
 * ICU strings*: catalogs loaded at runtime through `load()` and the
 * `descriptor.message` source text used when an id is missing.
 *
 * Dictionary content never goes through it — the build already converted
 * every ICU construct into intlayer nodes, which resolve without a parser.
 *
 * Binding the converter here, instead of selecting it by dialect at runtime,
 * leaves the other message-format parsers unreferenced so they tree-shake out
 * of the app bundle.
 */
const resolveIcuMessage = createMessageResolver(icuToIntlayerFormatter);

/** First dot-segment of a lingui id and the remainder, e.g. `footer.github`. */
const splitMessageId = (
  id: string
): { dictionaryKey: string; remainder: string } => {
  const dotPosition = id.indexOf('.');
  if (dotPosition === -1) return { dictionaryKey: id, remainder: '' };
  return {
    dictionaryKey: id.slice(0, dotPosition),
    remainder: id.slice(dotPosition + 1),
  };
};

/**
 * A message template as it was found, tagged with the way it must be
 * interpolated: dictionary nodes resolve directly, raw catalog messages are
 * parsed as ICU first.
 */
type ResolvedTemplate =
  | { kind: 'node'; node: unknown }
  | { kind: 'icu'; message: string };

/** Mirrors the unexported `Values` type from `@lingui/core`. */
type Values = Record<string, unknown>;

/** Mirrors the unexported `MessageCompiler` type from `@lingui/core`. */
type MessageCompiler = (message: string) => unknown;

/** Mirrors the unexported `Events` type from `@lingui/core`. */
type LinguiEvents = {
  change: () => void;
  missing: (event: { locale: Locale; id: MessageId }) => void;
};

/** Mirrors `VariableValue` from `@lingui/core` (≥ 6.11). */
export type VariableValue = string | number | Date;

/** Mirrors `Variables` from `@lingui/core` (≥ 6.11). */
export type Variables = Record<string, VariableValue | (() => VariableValue)>;

/** Mirrors `FormatterContext` from `@lingui/core` (≥ 6.12). */
export type FormatterContext = {
  locale: Locale;
  locales?: Locales;
  param?: string;
};

/** Mirrors `Formatter` from `@lingui/core` (≥ 6.12). */
export type Formatter = (value: unknown, context: FormatterContext) => unknown;

/** Mirrors `Formatters` from `@lingui/core` (≥ 6.12). */
export type Formatters = Record<string, Formatter>;

/** ICU argument types lingui reserves for its built-in formatters. */
const RESERVED_FORMATTER_NAMES = [
  'plural',
  'selectordinal',
  'select',
  'number',
  'date',
  'time',
];

/** Throws, like lingui, when a formatter would shadow a built-in ICU type. */
const assertNoReservedFormatters = (formatters: Formatters): void => {
  const reservedNames = Object.keys(formatters).filter((name) =>
    RESERVED_FORMATTER_NAMES.includes(name)
  );

  if (reservedNames.length > 0) {
    throw new Error(
      `Lingui: Formatter names ${reservedNames
        .map((name) => `"${name}"`)
        .join(', ')} are reserved for built-in ICU formatters.`
    );
  }
};

/**
 * Exposes the `variables` an interpolation does not provide, as lazy getters:
 * a value given at the call site wins, and a function variable only runs when
 * its message references it — the way lingui resolves them.
 */
const withVariables = (values: Values, variables: Variables): Values => {
  const variableNames = Object.keys(variables).filter(
    (name) => values[name] === undefined || values[name] === null
  );
  if (variableNames.length === 0) return values;

  const merged: Values = { ...values };
  for (const name of variableNames) {
    Object.defineProperty(merged, name, {
      enumerable: true,
      get: () => {
        const variable = variables[name];
        return typeof variable === 'function' ? variable() : variable;
      },
    });
  }
  return merged;
};

/** Mirrors the unexported `I18nProps` type from `@lingui/core`. */
export type I18nProps = {
  locale?: Locale;
  locales?: Locales;
  messages?: AllMessages;
  missing?: string | ((locale: string, id: string) => string);
  /** Values every message can reference without passing them (≥ 6.11). */
  variables?: Variables;
  /** Formatters for custom ICU argument types (≥ 6.12). */
  formatters?: Formatters;
  /**
   * How to reach the runtime dictionary registry. Supplied by the unoptimized
   * entry points (`useLingui`, `setupI18n`); omitted by the build-optimized
   * `useDictionary` variants, which already carry their dictionary's content —
   * keeping `@intlayer/dictionaries-entry` out of their module graph.
   *
   * @internal
   */
  registry?: RegistryResolver;
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
  /**
   * Content of the dictionaries bound by the build-optimized `useDictionary`
   * / `useDictionaryDynamic` variants, keyed by dictionary key and already
   * interpreted for the active locale. Checked before the runtime registry so
   * lookups stay tree-shakeable.
   */
  private _boundDictionaries: Record<string, unknown> = {};
  /**
   * Registry access, when the creator supplied it. Absent for the
   * build-optimized variants — see {@link I18nProps.registry}.
   */
  private _registry?: RegistryResolver;
  private _variables: Variables = {};
  private _formatters: Formatters = {};

  constructor({
    locale = internationalization.defaultLocale,
    locales,
    messages,
    variables,
    formatters,
    registry,
  }: I18nProps = {}) {
    super();
    this._locale =
      typeof locale === 'string' ? locale : internationalization.defaultLocale;
    this._locales = locales;
    this._registry = registry;
    if (messages) this.mergeAllCatalogs(messages);
    if (variables) this._variables = { ...variables };
    if (formatters) {
      assertNoReservedFormatters(formatters);
      this._formatters = { ...formatters };
    }
  }

  /** Values every message can reference without passing them. */
  get variables(): Variables {
    return this._variables;
  }

  /** Sets one variable; `undefined` removes it. Emits `'change'`. */
  setVariable(
    name: string,
    value?: VariableValue | (() => VariableValue)
  ): this {
    if (value === undefined) {
      delete this._variables[name];
    } else {
      this._variables[name] = value;
    }
    this.emit('change');
    return this;
  }

  /** Replaces every variable, or derives them from the previous ones. */
  setVariables(variables: Variables | ((previous: Variables) => Variables)) {
    this._variables = {
      ...(typeof variables === 'function'
        ? variables(this._variables)
        : variables),
    };
    this.emit('change');
    return this;
  }

  /** Formatters for custom ICU argument types (`{price, currency, EUR}`). */
  get formatters(): Formatters {
    return this._formatters;
  }

  /** Sets one formatter; `undefined` removes it. Emits `'change'`. */
  setFormatter(name: string, formatter?: Formatter): this {
    if (formatter === undefined) {
      delete this._formatters[name];
    } else {
      assertNoReservedFormatters({ [name]: formatter });
      this._formatters[name] = formatter;
    }
    this.emit('change');
    return this;
  }

  /** Replaces every formatter, or derives them from the previous ones. */
  setFormatters(
    formatters: Formatters | ((previous: Formatters) => Formatters)
  ): this {
    const nextFormatters =
      typeof formatters === 'function'
        ? formatters(this._formatters)
        : formatters;
    assertNoReservedFormatters(nextFormatters);
    this._formatters = { ...nextFormatters };
    this.emit('change');
    return this;
  }

  /** Adapts the lingui formatters to the core resolver's formatter shape. */
  private getArgumentFormatters(): MessageArgumentFormatters | undefined {
    const entries = Object.entries(this._formatters);
    if (entries.length === 0) return undefined;

    return Object.fromEntries(
      entries.map(([name, formatter]) => [
        name,
        (value: unknown, { style }: { style?: string }) =>
          formatter(value, {
            locale: this._locale,
            locales: this._locales,
            param: style,
          }),
      ])
    );
  }

  get locale(): string {
    return this._locale;
  }

  get locales(): Locales | undefined {
    return this._locales;
  }

  get messages(): Messages {
    // Merge every intlayer dictionary (namespace) for the active locale into a
    // single flat catalog, unwrapping the lingui `{ messages: {…} }` wrapper.
    const dictionary: Messages = {
      ...this._registry?.all(this._locale as LocalesValues),
    };
    for (const content of Object.values(this._boundDictionaries)) {
      Object.assign(dictionary, unwrapLinguiCatalog(content));
    }
    // The compiled dictionaries win over the runtime fallback catalog.
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
   * Binds interpreted dictionary content, keyed by dictionary key and checked
   * before the runtime registry.
   *
   * An id is first addressed by its leading dot-segment (`footer.github` →
   * dictionary `footer`, key `github`, the shape produced by
   * `syncJSON({ splitKeys: 'key-prefix' })`), then looked up whole in every
   * bound dictionary — which is how a single un-split `messages` catalog, or
   * a dot-less id such as `mockBanner`, keeps resolving.
   *
   * @internal Used by the build-optimized `useDictionary` /
   * `useDictionaryDynamic` variants — not part of the lingui API surface.
   */
  bindDictionaries(dictionaries: Record<string, unknown>): this {
    this._boundDictionaries = dictionaries;
    return this;
  }

  /**
   * Sets the active locale and emits `'change'` to notify React consumers.
   */
  activate(locale: Locale, locales?: Locales): void {
    this._locale = locale;
    this._locales = locales;
    this.emit('change');
  }

  /** Reads an id from the dictionaries bound by the optimized variants. */
  private lookupBoundDictionaries(id: string): unknown {
    const { dictionaryKey, remainder } = splitMessageId(id);

    const prefixed = this._boundDictionaries[dictionaryKey];
    if (prefixed !== undefined) {
      const value = navigateLinguiCatalog(prefixed, remainder);
      if (value !== undefined) return value;
    }

    for (const content of Object.values(this._boundDictionaries)) {
      const value = navigateLinguiCatalog(content, id);
      if (value !== undefined) return value;
    }

    return undefined;
  }

  /**
   * Resolves the message template for an id (before interpolation).
   *
   * Resolution order:
   * 1. dictionary content bound by the build-optimized `useDictionary` variants
   * 2. the runtime dictionary registry, when the creator supplied access to it
   * 3. runtime fallback catalog (constructor / `load()` / `loadAndActivate()`)
   */
  private resolveTemplate(id: string): ResolvedTemplate | undefined {
    const boundNode = this.lookupBoundDictionaries(id);
    if (boundNode !== undefined) return { kind: 'node', node: boundNode };

    const registryNode = this._registry?.lookup(
      id,
      this._locale as LocalesValues
    );
    if (registryNode !== undefined) return { kind: 'node', node: registryNode };

    const catalog = this._catalogs[this._locale];
    if (catalog) {
      const raw = navigateLinguiCatalog(catalog, id);
      if (raw !== undefined) {
        return { kind: 'icu', message: linguiMessageToIcu(raw) };
      }
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

    const messageValues = withVariables(resolvedValues, this._variables);
    const locale = this._locale as LocalesValues;
    const formatters = this.getArgumentFormatters();
    const template = this.resolveTemplate(id) ?? {
      kind: 'icu',
      message: defaultMessage ?? id,
    };

    return (
      (template.kind === 'node'
        ? resolveMessageNodeToString(
            template.node,
            messageValues,
            locale,
            formatters
          )
        : resolveIcuMessage(
            template.message,
            messageValues,
            locale,
            formatters
          )) ?? id
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
    value?: string | DateTimeFormatValue,
    format?: Intl.DateTimeFormatOptions
  ): string {
    if (value === undefined || value === null) return '';
    return new Intl.DateTimeFormat(
      this._locales ?? this._locale,
      format
    ).format(typeof value === 'string' ? new Date(value) : value);
  }

  /**
   * @deprecated Use `Intl.NumberFormat` directly.
   */
  number(value: NumberFormatValue, format?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this._locales ?? this._locale, format).format(
      value
    );
  }
}
