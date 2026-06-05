import { internationalization } from '@intlayer/config/built';
import { getIntlayer } from '@intlayer/core/interpreter';
import type { i18n as I18nInterface, InitOptions, TOptions } from 'i18next';

type EventHandler = (...args: any[]) => void;

const navigatePath = (obj: any, path: string): any => {
  if (!path) return obj;
  let current = obj;
  for (const part of path.split('.')) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
};

const interpolate = (value: string, params: Record<string, any>): string =>
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

export const createInstance = (
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

  const emit = (event: string, ...args: any[]) => {
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
    const lngTarget = (options as any)?.lng ?? lang;

    let namespace = ns;
    let path = key;
    if (key.includes(':')) {
      const idx = key.indexOf(':');
      namespace = key.slice(0, idx);
      path = key.slice(idx + 1);
    }

    try {
      const dict = getIntlayer(namespace as any, lngTarget as any);
      const value = navigatePath(dict, path);
      if (value == null) return (options as any)?.defaultValue ?? key;

      const str = String(value);
      const params: Record<string, any> = {};
      if (options && typeof options === 'object') {
        for (const [k, v] of Object.entries(options)) {
          if (!SKIP_KEYS.has(k)) params[k] = v;
        }
      }
      return Object.keys(params).length ? interpolate(str, params) : str;
    } catch {
      return (options as any)?.defaultValue ?? key;
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
    modules: {} as any,
    services: {} as any,
    store: {} as any,
    format: ((value: any) => String(value)) as any,

    async init(optionsOrCb?: any, cb?: any) {
      const opts = typeof optionsOrCb === 'function' ? {} : (optionsOrCb ?? {});
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
      callback?.(null, t);
      return t as any;
    },

    t(key: any, optionsOrDefaultValue?: any, extraOpts?: any): any {
      const options =
        typeof optionsOrDefaultValue === 'string'
          ? { defaultValue: optionsOrDefaultValue, ...(extraOpts ?? {}) }
          : optionsOrDefaultValue;
      const keys: string[] = Array.isArray(key) ? key : [key];
      for (const k of keys) {
        const result = resolveKey(currentLanguage, defaultNS, k, options);
        if (result !== k) return result;
      }
      return (
        options?.defaultValue ??
        (Array.isArray(key) ? key[key.length - 1] : key)
      );
    },

    async changeLanguage(lng?: string, cb?: any) {
      const prev = currentLanguage;
      if (lng) currentLanguage = lng;
      emit('languageChanged', currentLanguage, prev);
      const t = instance.t.bind(instance);
      cb?.(null, t);
      return t as any;
    },

    exists(key: string, options?: any): boolean {
      const ns = options?.ns
        ? Array.isArray(options.ns)
          ? options.ns[0]
          : options.ns
        : defaultNS;
      try {
        const dict = getIntlayer(ns as any, currentLanguage as any);
        const path = key.includes(':') ? key.slice(key.indexOf(':') + 1) : key;
        return navigatePath(dict, path) != null;
      } catch {
        return false;
      }
    },

    getFixedT(lng: any, ns?: any, keyPrefix?: any): any {
      const fixedLng = Array.isArray(lng)
        ? (lng[0] ?? currentLanguage)
        : (lng ?? currentLanguage);
      const fixedNS = ns ?? defaultNS;
      return (key: string, opts?: TOptions) => {
        const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
        return resolveKey(fixedLng, fixedNS, fullKey, opts);
      };
    },

    use(module: any) {
      module?.init?.(instance as unknown as I18nInterface);
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

    emit(eventName: string, ...args: any[]) {
      emit(eventName, ...args);
    },

    createInstance(opts?: InitOptions, _cb?: any) {
      return createInstance({ ...instanceOptions, ...opts });
    },

    cloneInstance(opts?: InitOptions, _cb?: any) {
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
          (Array.isArray(ns) ? ns[0] : ns) as any,
          currentLanguage as any
        );
        return true;
      } catch {
        return false;
      }
    },

    async loadNamespaces(_ns: any) {},
    async loadLanguages(_lngs: any) {},
    loadResources(_cb?: any) {},
    async reloadResources() {},

    getDataByLanguage(_lng: string) {
      return undefined;
    },

    getResource(lng: string, ns: string, key: string): any {
      try {
        return navigatePath(getIntlayer(ns as any, lng as any), key);
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
        store: {} as any,
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
