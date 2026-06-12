import { log } from '@intlayer/config/built';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getIntlayer } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { App, InjectionKey, WritableComputedRef } from 'vue';
import { computed } from 'vue';
import type { createI18n as _createI18n, I18n } from 'vue-i18n';
import { installIntlayer, useLocale } from 'vue-intlayer';

export const VERSION = '9.13.1';
export const I18nInjectionKey: InjectionKey<I18n> = Symbol('global-i18n');

const navigatePath = (obj: unknown, path: string): unknown => {
  if (!path) return obj;
  let current: unknown = obj;
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

const interpolate = (value: string, params: Record<string, unknown>): string =>
  value
    .replace(/\{\{(\w+)\}\}/g, (_, key) =>
      params[key] != null ? String(params[key]) : `{{${key}}}`
    )
    .replace(/\{(\w+)\}/g, (_, key) =>
      params[key] != null ? String(params[key]) : `{${key}}`
    );

const resolveKey = (
  lang: string,
  ns: string,
  key: string,
  params?: Record<string, unknown>
): string => {
  let namespace = ns;
  let path = key;
  if (key.includes(':')) {
    const idx = key.indexOf(':');
    namespace = key.slice(0, idx);
    path = key.slice(idx + 1);
  }

  try {
    const dict = getIntlayer(
      namespace as DictionaryKeys,
      lang as LocalesValues
    );
    const value = navigatePath(dict, path);
    if (value != null) {
      const str = String(value);
      return params ? interpolate(str, params) : str;
    }
  } catch {}

  if (key.includes('.')) {
    const idx = key.indexOf('.');
    const firstSegment = key.slice(0, idx);
    const rest = key.slice(idx + 1);
    try {
      const dict = getIntlayer(
        firstSegment as DictionaryKeys,
        lang as LocalesValues
      );
      const value = navigatePath(dict, rest);
      if (value != null) {
        const str = String(value);
        return params ? interpolate(str, params) : str;
      }
    } catch {}
  }

  return key;
};

export const createI18n = ((options: Record<string, unknown> = {}) => {
  if (options.messages !== undefined) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('createI18n', ANSIColors.CYAN)}: the ${colorize('`messages`', ANSIColors.CYAN)} option is ignored when using ${colorize('@intlayer/vue-i18n', ANSIColors.MAGENTA)} — translations are served from the compiled intlayer dictionaries instead. Remove the locale JSON imports and the ${colorize('`messages`', ANSIColors.CYAN)} option to reduce your bundle size:\n  ${colorize('Before:', ANSIColors.GREY)} createI18n({ messages: { en, fr, … } })\n  ${colorize('After: ', ANSIColors.GREY)} createI18n({})`
    );
  }

  const locale = (options.locale as string) ?? 'en';
  const availableLocales = options.messages
    ? Object.keys(options.messages as Record<string, unknown>)
    : [];

  const globalT = (key: string, ...args: unknown[]) => {
    const params =
      typeof args[0] === 'object' && args[0] !== null
        ? (args[0] as Record<string, unknown>)
        : undefined;
    return resolveKey(locale, 'translation', key, params);
  };

  const global = {
    locale: locale,
    availableLocales,
    t: globalT,
    n: (val: unknown) => String(val),
    d: (val: unknown) => String(val),
  };

  const i18nInstance = {
    global,
    mode: 'composition',
    install(app: App) {
      installIntlayer(app, {
        locale: options.locale as LocalesValues,
      });

      // Provide under I18nInjectionKey to satisfy inject(I18nInjectionKey) calls
      app.provide(I18nInjectionKey, i18nInstance as unknown as I18n);

      // Legacy API support ($t / $i18n)
      app.config.globalProperties.$t = (key: string, ...args: unknown[]) => {
        const currentLoc =
          (
            app.config.globalProperties.$i18n as unknown as
              | Record<string, unknown>
              | undefined
          )?.locale ?? 'en';
        const params =
          typeof args[0] === 'object' && args[0] !== null
            ? (args[0] as Record<string, unknown>)
            : undefined;
        return resolveKey(
          typeof currentLoc === 'object' &&
            currentLoc !== null &&
            'value' in currentLoc
            ? String((currentLoc as { value: unknown }).value)
            : String(currentLoc),
          'translation',
          key,
          params
        );
      };
      (app.config.globalProperties as Record<string, unknown>).$i18n = global;
    },
  };

  return i18nInstance as I18n;
}) as typeof _createI18n;

/**
 * Composable providing a typed `t()` function scoped to a dictionary namespace.
 * Pass `{ namespace: 'myDict' }` to restrict keys to valid dot-notation paths
 * within that intlayer dictionary (autocompleted and validated at compile time).
 *
 * @example
 * ```ts
 * const { t } = useI18n({ namespace: 'about' });
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 * ```
 */
export const useI18n = <N extends DictionaryKeys = DictionaryKeys>(
  options?: Record<string, unknown> & { namespace?: N }
): {
  locale: WritableComputedRef<string>;
  availableLocales: string[];
  t: <P extends ValidDotPathsFor<N>>(key: P, ...args: unknown[]) => string;
  n: (val: unknown) => string;
  d: (val: unknown) => string;
} => {
  const { locale: currentLocale, setLocale, availableLocales } = useLocale();

  const namespace = ((options?.namespace as string) ?? 'translation') as N;

  const localeRef = computed({
    get: () => currentLocale.value,
    set: (newVal: string) => {
      setLocale(newVal as LocalesValues);
    },
  });

  const t = <P extends ValidDotPathsFor<N>>(
    key: P,
    ...args: unknown[]
  ): string => {
    const params =
      typeof args[0] === 'object' && args[0] !== null
        ? (args[0] as Record<string, unknown>)
        : undefined;
    return resolveKey(currentLocale.value, namespace, String(key), params);
  };

  return {
    locale: localeRef,
    availableLocales: availableLocales as string[],
    t,
    n: (val: unknown) => String(val),
    d: (val: unknown) => String(val),
  };
};
