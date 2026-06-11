import { internationalization } from '@intlayer/config/built';
import { getIntlayer } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
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

type EventHandler = (...args: unknown[]) => void;

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
  value.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    params[key] != null ? String(params[key]) : `{{${key}}}`
  );

const SKIP_KEYS = new Set([
  'defaultValue',
  'count',
  'context',
  'ns',
  'lng',
  'returnObjects',
  'returnDetails',
]);

export const createInstance: typeof _createInstance = (
  instanceOptions: InitOptions = {}
): I18nInterface => {
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

  const resolveKey = (
    lang: string,
    ns: string,
    key: string,
    opts?: TOptions | string
  ): string => {
    const options =
      typeof opts === 'string' ? { defaultValue: opts } : (opts as TOptions);
    const lngTarget =
      ((options as Record<string, unknown> | undefined)?.lng as
        | string
        | undefined) ?? lang;

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
        lngTarget as LocalesValues
      );
      const value = navigatePath(dict, path);
      if (value == null)
        return (
          ((options as Record<string, unknown> | undefined)?.defaultValue as
            | string
            | undefined) ?? key
        );

      const str = String(value);
      const params: Record<string, unknown> = {};
      if (options && typeof options === 'object') {
        for (const [k, v] of Object.entries(options)) {
          if (!SKIP_KEYS.has(k)) params[k] = v;
        }
      }
      return Object.keys(params).length ? interpolate(str, params) : str;
    } catch {
      return (
        ((options as Record<string, unknown> | undefined)?.defaultValue as
          | string
          | undefined) ?? key
      );
    }
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
      for (const k of keys) {
        const result = resolveKey(currentLanguage, defaultNS, k, options);
        if (result !== k) return result;
      }
      return (
        (options as Record<string, unknown> | undefined)?.defaultValue ??
        (Array.isArray(key) ? key[key.length - 1] : key)
      );
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
      const opts = options as Record<string, unknown> | undefined;
      const ns = opts?.ns
        ? Array.isArray(opts.ns)
          ? (opts.ns[0] as string)
          : (opts.ns as string)
        : defaultNS;
      try {
        const dict = getIntlayer(
          ns as DictionaryKeys,
          currentLanguage as LocalesValues
        );
        const path = key.includes(':') ? key.slice(key.indexOf(':') + 1) : key;
        return navigatePath(dict, path) != null;
      } catch {
        return false;
      }
    },

    /**
     * Returns a `t()` function bound to a fixed locale and namespace.
     * When `ns` matches a registered intlayer dictionary key, the returned
     * function's `key` parameter is typed to only accept valid dot-notation
     * paths for that dictionary.
     *
     * @example
     * ```ts
     * const tAbout = i18n.getFixedT(null, 'about');
     * tAbout('counter.label'); // ✓ typed
     * ```
     */
    getFixedT<N extends DictionaryKeys>(
      lng: string | readonly string[] | null,
      ns?: N | null,
      keyPrefix?: string
    ): <P extends ValidDotPathsFor<N>>(key: P, opts?: TOptions) => string {
      const fixedLng = Array.isArray(lng)
        ? ((lng[0] as string) ?? currentLanguage)
        : ((lng as string) ?? currentLanguage);
      const fixedNS = (ns as string) ?? defaultNS;
      return <P extends ValidDotPathsFor<N>>(
        key: P,
        opts?: TOptions
      ): string => {
        const fullKey = keyPrefix ? `${keyPrefix}.${String(key)}` : String(key);
        return resolveKey(fixedLng, fixedNS, fullKey, opts);
      };
    },

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

/** Typed variant of i18next's `getFixedT`, scoped to an intlayer dictionary namespace. */
export type TypedGetFixedT = <N extends DictionaryKeys>(
  lng: string | readonly string[] | null,
  ns?: N | null,
  keyPrefix?: string
) => <P extends ValidDotPathsFor<N>>(key: P, opts?: TOptions) => string;
