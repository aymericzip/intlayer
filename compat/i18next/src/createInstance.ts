import { internationalization, log } from '@intlayer/config/built';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getIntlayer } from '@intlayer/core/interpreter';
import { navigatePath, resolveMessage } from '@intlayer/core/messageFormat';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type {
  createInstance as _createInstance,
  i18n as I18nInterface,
  InitOptions,
  TOptions,
} from 'i18next';
import {
  getInterpolationValues,
  resolveTranslation,
} from './resolveTranslation';
import type { TypedGetFixedT } from './typedTranslation';

export type { TypedGetFixedT } from './typedTranslation';

type EventHandler = (...args: unknown[]) => void;

const warnIgnoredResources = (location: string) => {
  const appLogger = getAppLogger({ log });
  appLogger(
    `${colorize(location, ANSIColors.CYAN)}: the ${colorize('`resources`', ANSIColors.CYAN)} option is ignored when using ${colorize('@intlayer/i18next', ANSIColors.MAGENTA)} — translations are served from the compiled intlayer dictionaries instead. Remove the resource imports and the ${colorize('`resources`', ANSIColors.CYAN)} option to reduce your bundle size.`
  );
};

export const createInstance: typeof _createInstance = (
  instanceOptions: InitOptions = {}
): I18nInterface => {
  if ((instanceOptions as Record<string, unknown>).resources !== undefined) {
    warnIgnoredResources('createInstance');
  }

  const config = internationalization;

  let currentLanguage: string =
    (instanceOptions.lng as string) ?? config?.defaultLocale ?? 'en';

  let defaultNS: string =
    (instanceOptions.defaultNS as string) ??
    (Array.isArray(instanceOptions.ns)
      ? (instanceOptions.ns[0] as string)
      : (instanceOptions.ns as string)) ??
    'translation';

  const listeners = new Map<string, Set<EventHandler>>();
  let initialized = false;

  const emit = (event: string, ...args: unknown[]) => {
    listeners.get(event)?.forEach((h) => {
      h(...args);
    });
  };

  const getSeparators = () => ({
    keySeparator:
      (instanceOptions.keySeparator as string | false | undefined) ?? '.',
    nsSeparator:
      (instanceOptions.nsSeparator as string | false | undefined) ?? ':',
  });

  /**
   * Resolves a key through the full i18next pipeline (namespace prefix,
   * `ns` option, plural/context suffixes, `$t()` nesting, interpolation).
   * Falls back to the interpolated `defaultValue`, then to the key itself.
   */
  const resolveKey = (
    lang: string,
    ns: string,
    key: string,
    opts?: TOptions | string
  ): string => {
    const options =
      typeof opts === 'string' ? { defaultValue: opts } : (opts as TOptions);

    const resolved = resolveTranslation({
      locale: lang as LocalesValues,
      namespace: ns,
      key,
      options,
      ...getSeparators(),
    });

    if (resolved !== undefined) return resolved as string;

    const defaultValue = (options as Record<string, unknown> | undefined)
      ?.defaultValue;
    if (typeof defaultValue === 'string') {
      return resolveMessage(
        defaultValue,
        getInterpolationValues(options),
        lang as LocalesValues,
        'i18next'
      );
    }

    return key;
  };

  const instance = {
    get language() {
      return currentLanguage;
    },
    get languages() {
      return (config?.locales?.map(String) ?? [
        currentLanguage,
      ]) as readonly string[];
    },
    get resolvedLanguage() {
      return currentLanguage;
    },
    get isInitialized() {
      return initialized;
    },
    isInitializing: false,
    initializedStoreOnce: false,
    initializedLanguageOnce: false,
    options: instanceOptions,
    modules: {} as I18nInterface['modules'],
    services: {} as I18nInterface['services'],
    store: {} as I18nInterface['store'],
    format: ((value: unknown) => String(value)) as I18nInterface['format'],

    async init(optionsOrCb?: unknown, cb?: unknown) {
      const opts =
        typeof optionsOrCb === 'function'
          ? {}
          : ((optionsOrCb ?? {}) as Record<string, unknown>);
      if (opts.resources !== undefined) {
        warnIgnoredResources('i18next.init');
      }
      if (opts.lng) currentLanguage = opts.lng as string;
      if (opts.defaultNS) defaultNS = opts.defaultNS as string;
      else if (opts.ns)
        defaultNS = Array.isArray(opts.ns)
          ? (opts.ns[0] as string)
          : (opts.ns as string);
      initialized = true;
      emit('initialized', opts);
      const t = instance.t.bind(instance);
      const callback = typeof optionsOrCb === 'function' ? optionsOrCb : cb;
      (callback as ((err: unknown, t: unknown) => void) | undefined)?.(null, t);
      return t as unknown as Promise<I18nInterface['t']>;
    },

    t(
      key: unknown,
      optionsOrDefaultValue?: unknown,
      extraOpts?: unknown
    ): unknown {
      const options =
        typeof optionsOrDefaultValue === 'string'
          ? {
              defaultValue: optionsOrDefaultValue,
              ...((extraOpts ?? {}) as Record<string, unknown>),
            }
          : (optionsOrDefaultValue as TOptions | undefined);
      const keys: string[] = Array.isArray(key)
        ? (key as string[])
        : [String(key)];
      for (const candidateKey of keys) {
        const result = resolveTranslation({
          locale: currentLanguage as LocalesValues,
          namespace: defaultNS,
          key: candidateKey,
          options,
          ...getSeparators(),
        });
        if (result !== undefined) return result;
      }

      const defaultValue = (options as Record<string, unknown> | undefined)
        ?.defaultValue;
      if (typeof defaultValue === 'string') {
        return resolveMessage(
          defaultValue,
          getInterpolationValues(options),
          currentLanguage as LocalesValues,
          'i18next'
        );
      }

      return defaultValue ?? (Array.isArray(key) ? key[key.length - 1] : key);
    },

    async changeLanguage(lng?: string, cb?: unknown) {
      const prev = currentLanguage;
      if (lng) currentLanguage = lng;
      emit('languageChanged', currentLanguage, prev);
      const t = instance.t.bind(instance);
      (cb as ((err: unknown, t: unknown) => void) | undefined)?.(null, t);
      return t as unknown as Promise<I18nInterface['t']>;
    },

    exists(key: string, options?: unknown): boolean {
      return (
        resolveTranslation({
          locale: currentLanguage as LocalesValues,
          namespace: defaultNS,
          key,
          options: options as TOptions,
          ...getSeparators(),
        }) !== undefined
      );
    },

    /**
     * Returns a `t()` function bound to a fixed locale and namespace.
     * When `ns` matches a registered intlayer dictionary key, the returned
     * function's `key` parameter is typed to only accept valid dot-notation
     * paths for that dictionary, and its return type is resolved from the
     * content at that path. With a `keyPrefix`, keys are relative dot-paths
     * under the prefix.
     *
     * @example
     * ```ts
     * const tAbout = i18n.getFixedT(null, 'about');
     * tAbout('counter.label'); // ✓ typed key and return value
     * ```
     */
    getFixedT: ((
      lng: string | readonly string[] | null,
      ns?: string | null,
      keyPrefix?: string
    ) => {
      const fixedLng = Array.isArray(lng)
        ? ((lng[0] as string) ?? currentLanguage)
        : ((lng as string) ?? currentLanguage);
      const fixedNS = ns ?? defaultNS;
      return (key: string, opts?: TOptions): string => {
        const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
        return resolveKey(fixedLng, fixedNS, fullKey, opts);
      };
    }) as TypedGetFixedT,

    use(module: unknown) {
      (module as { init?: (i18n: I18nInterface) => void })?.init?.(
        instance as unknown as I18nInterface
      );
      return instance as unknown as I18nInterface;
    },

    on(event: string, handler: EventHandler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(handler);
      return instance as unknown as I18nInterface;
    },

    once(event: string, handler: EventHandler) {
      const wrapper: EventHandler = (...args) => {
        handler(...args);
        instance.off(event, wrapper);
      };
      instance.on(event, wrapper);
      return instance as unknown as I18nInterface;
    },

    off(event: string, handler?: EventHandler) {
      if (!handler) listeners.delete(event);
      else listeners.get(event)?.delete(handler);
    },

    emit(eventName: string, ...args: unknown[]) {
      emit(eventName, ...args);
    },

    createInstance(opts?: InitOptions, _cb?: unknown) {
      return createInstance({ ...instanceOptions, ...opts });
    },

    cloneInstance(opts?: Record<string, unknown>, _cb?: unknown) {
      return createInstance({ ...instanceOptions, ...opts });
    },

    dir(lng?: string): 'ltr' | 'rtl' {
      const rtl = ['ar', 'he', 'fa', 'ur', 'ps', 'yi', 'dv', 'ug'];
      return rtl.some((l) => (lng ?? currentLanguage).startsWith(l))
        ? 'rtl'
        : 'ltr';
    },

    setDefaultNamespace(ns: string) {
      defaultNS = ns;
    },

    hasLoadedNamespace(ns: string | readonly string[]): boolean {
      try {
        getIntlayer(
          (Array.isArray(ns) ? ns[0] : ns) as DictionaryKeys,
          currentLanguage as LocalesValues
        );
        return true;
      } catch {
        return false;
      }
    },

    async loadNamespaces(_ns: unknown) {},
    async loadLanguages(_lngs: unknown) {},
    loadResources(_cb?: unknown) {},
    async reloadResources() {},

    getDataByLanguage(_lng: string) {
      return undefined;
    },

    getResource(lng: string, ns: string, key: string): unknown {
      try {
        return navigatePath(
          getIntlayer(ns as DictionaryKeys, lng as LocalesValues),
          key
        );
      } catch {
        return undefined;
      }
    },

    addResource: () => instance as unknown as I18nInterface,
    addResources: () => instance as unknown as I18nInterface,
    addResourceBundle: () => instance as unknown as I18nInterface,
    hasResourceBundle: () => false,
    getResourceBundle: () => undefined,
    removeResourceBundle: () => instance as unknown as I18nInterface,

    toJSON() {
      return {
        options: instanceOptions,
        store: {} as I18nInterface['store'],
        language: currentLanguage,
        languages: (config?.locales?.map(String) ?? [
          currentLanguage,
        ]) as readonly string[],
        resolvedLanguage: currentLanguage,
      };
    },
  };

  return instance as unknown as I18nInterface;
};
