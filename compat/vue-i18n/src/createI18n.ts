import { internationalization, log } from '@intlayer/config/built';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type {
  App,
  DirectiveBinding,
  InjectionKey,
  WritableComputedRef,
} from 'vue';
import { computed, inject } from 'vue';
import type { createI18n as _createI18n, I18n } from 'vue-i18n';
import { createIntlayerClient, installIntlayer, useLocale } from 'vue-intlayer';
import {
  type DateTimeFormatsConfig,
  formatDateValue,
  formatNumberValue,
  type NumberFormatsConfig,
} from './formats';
import {
  parseTranslateArguments,
  resolveVueMessage,
} from './resolveVueMessage';

export const VERSION = '9.13.1';
export const I18nInjectionKey: InjectionKey<I18n> = Symbol('global-i18n');

const navigatePath = (objectValue: unknown, path: string): unknown => {
  if (!path) return objectValue;
  let current: unknown = objectValue;
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

/**
 * Looks up a raw value for a vue-i18n key against intlayer dictionaries.
 *
 * Resolution order:
 * 1. `ns:key` prefix → dictionary `ns`
 * 2. The default namespace dictionary with the full dot-path
 * 3. The first key segment as the dictionary key (`'home.title'` →
 *    dictionary `home`, path `title`)
 */
const lookupRaw = (namespace: string | undefined, key: string): unknown => {
  let _targetNamespace = namespace;
  let _path = key;

  if (key.includes(':')) {
    const separatorIndex = key.indexOf(':');
    _targetNamespace = key.slice(0, separatorIndex);
    _path = key.slice(separatorIndex + 1);
  }

  // Without getDictionaries, global translation fallback to intlayer dictionaries
  // is disabled for bundle optimization purposes.
  // We only lookup if the namespace exists globally, but since we don't have getDictionaries
  // we rely strictly on what vue-i18n already has in its messages.

  return undefined;
};

/** Translates a key with vue-i18n's polymorphic argument list. */
const translateKey = (
  locale: string,
  namespace: string | undefined,
  key: string,
  args: unknown[],
  fallbackMessages?: Record<string, unknown>
): string => {
  const { values, count, defaultMessage } = parseTranslateArguments(args);

  const rawValue = lookupRaw(namespace, key);

  if (rawValue === undefined) {
    if (fallbackMessages?.[locale]) {
      // Defer to the user's provided messages if not found in dictionaries
      const targetPath = namespace ? `${namespace}.${key}` : key;
      const fallbackValue = navigatePath(fallbackMessages[locale], targetPath);
      if (fallbackValue !== undefined) {
        return resolveVueMessage(
          fallbackValue,
          values,
          count,
          locale as LocalesValues
        );
      }
    }
    if (defaultMessage !== undefined) {
      return resolveVueMessage(
        defaultMessage,
        values,
        count,
        locale as LocalesValues
      );
    }
    return key;
  }

  return resolveVueMessage(rawValue, values, count, locale as LocalesValues);
};

const getAvailableLocales = (): string[] =>
  internationalization?.locales?.map(String) ?? [];

const warnDeprecatedRuntimeMessages = (location: string) => {
  const appLogger = getAppLogger({ log });
  appLogger(
    `${colorize(location, ANSIColors.CYAN)} has no effect with ${colorize('@intlayer/vue-i18n', ANSIColors.MAGENTA)} — translations are managed by the compiled intlayer dictionaries.`
  );
};

/** Value accepted by the `v-t` directive. */
type TranslateDirectiveValue =
  | string
  | { path: string; args?: Record<string, unknown>; choice?: number };

export const createI18n: typeof _createI18n = ((
  options: Record<string, unknown> = {}
) => {
  const fallbackMessages = options.messages as
    | Record<string, unknown>
    | undefined;

  if (
    options.messages !== undefined &&
    process.env.NODE_ENV === 'development'
  ) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('createI18n', ANSIColors.CYAN)}: the ${colorize('`messages`', ANSIColors.CYAN)} option is used as a fallback. For optimal bundle size, remove the locale JSON imports and use ${colorize('useDictionary', ANSIColors.CYAN)} or compile your intlayer dictionaries instead:\n  ${colorize('Before:', ANSIColors.GREY)} createI18n({ messages: { en, fr, … } })\n  ${colorize('After: ', ANSIColors.GREY)} createI18n({})`
    );
  }

  const client = createIntlayerClient(options.locale as LocalesValues);

  const datetimeFormats = options.datetimeFormats as
    | DateTimeFormatsConfig
    | undefined;
  const numberFormats = options.numberFormats as
    | NumberFormatsConfig
    | undefined;

  const currentLocale = (): string => String(client.locale.value);

  /** Writable ref matching vue-i18n's composition-mode `global.locale`. */
  const localeRef: WritableComputedRef<string> = computed({
    get: () => currentLocale(),
    set: (newLocale: string) => {
      client.setLocale(newLocale as LocalesValues);
    },
  });

  const globalTranslate = (key: string, ...args: unknown[]): string =>
    translateKey(currentLocale(), undefined, key, args, fallbackMessages);

  const globalDate = (
    value: Date | number | string,
    formatOrOptions?: string | Intl.DateTimeFormatOptions
  ): string =>
    formatDateValue(value, formatOrOptions, currentLocale(), datetimeFormats);

  const globalNumber = (
    value: number,
    formatOrOptions?: string | Intl.NumberFormatOptions
  ): string =>
    formatNumberValue(value, formatOrOptions, currentLocale(), numberFormats);

  const global = {
    locale: localeRef,
    availableLocales: getAvailableLocales(),
    fallbackLocale: (options.fallbackLocale ??
      internationalization?.defaultLocale) as string,
    t: globalTranslate,
    tc: globalTranslate,
    te: (key: string): boolean => lookupRaw(undefined, key) !== undefined,
    tm: (key: string): unknown => lookupRaw(undefined, key) ?? {},
    rt: (message: unknown, ...args: unknown[]): string => {
      const { values, count } = parseTranslateArguments(args);
      return resolveVueMessage(
        message,
        values,
        count,
        currentLocale() as LocalesValues
      );
    },
    d: globalDate,
    n: globalNumber,
    setLocaleMessage: (_locale: string, _messages: unknown) => {
      warnDeprecatedRuntimeMessages('setLocaleMessage');
    },
    mergeLocaleMessage: (_locale: string, _messages: unknown) => {
      warnDeprecatedRuntimeMessages('mergeLocaleMessage');
    },
    getLocaleMessage: (_locale: string): Record<string, unknown> => {
      warnDeprecatedRuntimeMessages('getLocaleMessage');
      // We do not load global dictionaries anymore for bundle optimization.
      // The user should use useDictionary or rely on manually provided messages.
      return {};
    },
  };

  /** Legacy Options-API facade (`this.$i18n`) with a string `locale`. */
  const legacyI18n = {
    get locale(): string {
      return currentLocale();
    },
    set locale(newLocale: string) {
      client.setLocale(newLocale as LocalesValues);
    },
    get availableLocales(): string[] {
      return getAvailableLocales();
    },
    t: globalTranslate,
    tc: globalTranslate,
    te: global.te,
    tm: global.tm,
    rt: global.rt,
    d: globalDate,
    n: globalNumber,
  };

  const applyTranslateDirective = (
    element: HTMLElement,
    binding: DirectiveBinding<TranslateDirectiveValue>
  ) => {
    const bindingValue = binding.value;
    if (typeof bindingValue === 'string') {
      element.textContent = globalTranslate(bindingValue);
    } else if (bindingValue && typeof bindingValue === 'object') {
      const directiveArgs: unknown[] = [];
      if (bindingValue.args) directiveArgs.push(bindingValue.args);
      if (typeof bindingValue.choice === 'number')
        directiveArgs.push(bindingValue.choice);
      element.textContent = globalTranslate(
        bindingValue.path,
        ...directiveArgs
      );
    }
  };

  const i18nInstance = {
    global,
    mode: options.legacy === true ? 'legacy' : 'composition',
    __optionsMessages: fallbackMessages,
    install(app: App) {
      installIntlayer(app, {
        locale: options.locale as LocalesValues,
      });

      // Provide under I18nInjectionKey to satisfy inject(I18nInjectionKey) calls
      app.provide(I18nInjectionKey, i18nInstance as unknown as I18n);

      // Legacy API support ($t / $tc / $te / $tm / $rt / $d / $n / $i18n)
      app.config.globalProperties.$t = globalTranslate;
      (app.config.globalProperties as Record<string, unknown>).$tc =
        globalTranslate;
      (app.config.globalProperties as Record<string, unknown>).$te = global.te;
      (app.config.globalProperties as Record<string, unknown>).$tm = global.tm;
      (app.config.globalProperties as Record<string, unknown>).$rt = global.rt;
      (app.config.globalProperties as Record<string, unknown>).$d = globalDate;
      (app.config.globalProperties as Record<string, unknown>).$n =
        globalNumber;
      (app.config.globalProperties as Record<string, unknown>).$i18n =
        legacyI18n;

      // `v-t` directive support
      app.directive('t', {
        beforeMount: applyTranslateDirective,
        updated: applyTranslateDirective,
      });
    },
  };

  return i18nInstance as unknown as I18n;
}) as typeof _createI18n;

/**
 * Composable providing a typed `t()` function scoped to a dictionary namespace.
 * Pass `{ namespace: 'myDict' }` to restrict keys to valid dot-notation paths
 * within that intlayer dictionary (autocompleted and validated at compile time).
 *
 * Supports vue-i18n's full message syntax: named (`{name}`) and list (`{0}`)
 * interpolation, pipe choice messages (`'car | cars'` with a count argument),
 * plus `te`/`tm`/`rt` and `Intl`-backed `d()`/`n()` formatters.
 *
 * @example
 * ```ts
 * const { t } = useI18n({ namespace: 'about' });
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 * t('apples', 5); // pipe plural choice
 * ```
 */
export const useI18n = <N extends DictionaryKeys = DictionaryKeys>(
  options?: Record<string, unknown> & { namespace?: N }
): {
  locale: WritableComputedRef<string>;
  availableLocales: string[];
  t: <P extends ValidDotPathsFor<N>>(key: P, ...args: unknown[]) => string;
  tc: <P extends ValidDotPathsFor<N>>(key: P, ...args: unknown[]) => string;
  te: <P extends ValidDotPathsFor<N>>(key: P) => boolean;
  tm: <P extends ValidDotPathsFor<N>>(key: P) => unknown;
  rt: (message: unknown, ...args: unknown[]) => string;
  d: (
    value: Date | number | string,
    formatOrOptions?: string | Intl.DateTimeFormatOptions
  ) => string;
  n: (
    value: number,
    formatOrOptions?: string | Intl.NumberFormatOptions
  ) => string;
} => {
  const { locale: currentLocale, setLocale, availableLocales } = useLocale();
  const instance = inject(I18nInjectionKey) as
    | Record<string, unknown>
    | undefined;
  const fallbackMessages = instance?.__optionsMessages as
    | Record<string, unknown>
    | undefined;

  const namespace = options?.namespace as string | undefined as N | undefined;

  const datetimeFormats = options?.datetimeFormats as
    | DateTimeFormatsConfig
    | undefined;
  const numberFormats = options?.numberFormats as
    | NumberFormatsConfig
    | undefined;

  const localeRef = computed({
    get: () => currentLocale.value as string,
    set: (newLocale: string) => {
      setLocale(newLocale as LocalesValues);
    },
  });

  const translate = <P extends ValidDotPathsFor<N>>(
    key: P,
    ...args: unknown[]
  ): string =>
    translateKey(
      currentLocale.value,
      namespace,
      String(key),
      args,
      fallbackMessages
    );

  return {
    locale: localeRef,
    availableLocales: availableLocales as string[],
    t: translate,
    tc: translate,
    te: <P extends ValidDotPathsFor<N>>(key: P): boolean =>
      lookupRaw(namespace, String(key)) !== undefined,
    tm: <P extends ValidDotPathsFor<N>>(key: P): unknown =>
      lookupRaw(namespace, String(key)) ?? {},
    rt: (message: unknown, ...args: unknown[]): string => {
      const { values, count } = parseTranslateArguments(args);
      return resolveVueMessage(
        message,
        values,
        count,
        currentLocale.value as LocalesValues
      );
    },
    d: (
      value: Date | number | string,
      formatOrOptions?: string | Intl.DateTimeFormatOptions
    ): string =>
      formatDateValue(
        value,
        formatOrOptions,
        currentLocale.value,
        datetimeFormats
      ),
    n: (
      value: number,
      formatOrOptions?: string | Intl.NumberFormatOptions
    ): string =>
      formatNumberValue(
        value,
        formatOrOptions,
        currentLocale.value,
        numberFormats
      ),
  };
};
