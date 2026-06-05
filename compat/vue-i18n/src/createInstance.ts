import { internationalization } from '@intlayer/config/built';
import { getIntlayer } from '@intlayer/core/interpreter';

type EventHandler = (...args: any[]) => void;

export interface InitOptions {
  lng?: string;
  fallbackLng?: string | string[] | false;
  ns?: string | string[];
  defaultNS?: string;
  [key: string]: any;
}

export interface TOptions {
  defaultValue?: string;
  count?: number;
  context?: string;
  ns?: string | string[];
  lng?: string;
  returnObjects?: boolean;
  [key: string]: any;
}

export interface I18n {
  language: string;
  languages: readonly string[];
  isInitialized: boolean;
  init(options?: InitOptions): Promise<I18n>;
  t(
    key: string | string[],
    options?: TOptions | string,
    interpolationOptions?: Record<string, any>
  ): string;
  changeLanguage(lng: string): Promise<() => void>;
  exists(key: string, options?: TOptions): boolean;
  getFixedT(
    lng: string | null,
    ns?: string | null,
    keyPrefix?: string
  ): (key: string, options?: TOptions) => string;
  use(module: any): I18n;
  on(event: string, handler: EventHandler): void;
  off(event: string, handler?: EventHandler): void;
  emit(event: string, ...args: any[]): void;
  createInstance(options?: InitOptions): I18n;
  cloneInstance(options?: InitOptions): I18n;
}

const navigatePath = (objectValue: any, path: string): any => {
  if (!path) return objectValue;
  const parts = path.split('.');
  let current = objectValue;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
};

const interpolate = (value: string, params: Record<string, any>): string =>
  value.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    params[key] != null ? String(params[key]) : `{{${key}}}`
  );

const extractInterpolationParams = (
  options: TOptions | undefined
): Record<string, any> => {
  if (!options || typeof options === 'string') return {};
  const skip = new Set([
    'defaultValue',
    'count',
    'context',
    'ns',
    'lng',
    'returnObjects',
  ]);
  return Object.fromEntries(
    Object.entries(options).filter(([keyItem]) => !skip.has(keyItem))
  );
};

export const createInstance = (instanceOptions: InitOptions = {}): I18n => {
  const config = internationalization;

  let currentLanguage: string =
    instanceOptions.lng ?? config?.defaultLocale ?? 'en';

  let defaultNS: string =
    instanceOptions.defaultNS ??
    (Array.isArray(instanceOptions.ns)
      ? instanceOptions.ns[0]
      : instanceOptions.ns) ??
    'translation';

  const listeners = new Map<string, Set<EventHandler>>();
  let initialized = false;

  const emit = (event: string, ...args: any[]) => {
    listeners.get(event)?.forEach((handler) => {
      handler(...args);
    });
  };

  const resolveKey = (
    lang: string,
    ns: string,
    key: string,
    opts?: TOptions | string
  ): string => {
    const options = typeof opts === 'string' ? { defaultValue: opts } : opts;
    const languageTarget = options?.lng ?? lang;

    let namespace = ns;
    let path = key;
    if (key.includes(':')) {
      const index = key.indexOf(':');
      namespace = key.slice(0, index);
      path = key.slice(index + 1);
    }

    try {
      const dictionary = getIntlayer(namespace as any, languageTarget as any);
      const value = navigatePath(dictionary, path);
      if (value == null) return options?.defaultValue ?? key;

      const stringValue =
        typeof value === 'object' && value !== null
          ? String(value)
          : String(value);

      const params = extractInterpolationParams(options);
      return Object.keys(params).length > 0
        ? interpolate(stringValue, params)
        : stringValue;
    } catch {
      return options?.defaultValue ?? key;
    }
  };

  const instance: I18n = {
    get language() {
      return currentLanguage;
    },
    get languages() {
      return (config?.locales?.map(String) ?? [currentLanguage]) as string[];
    },
    get isInitialized() {
      return initialized;
    },

    async init(options = {}) {
      if (options.lng) currentLanguage = options.lng;
      if (options.defaultNS) defaultNS = options.defaultNS;
      else if (options.ns)
        defaultNS =
          (Array.isArray(options.ns) ? options.ns[0] : options.ns) ??
          'translation';
      initialized = true;
      emit('initialized', options);
      return instance;
    },

    t(
      key: string | string[],
      options?: TOptions | string,
      interpolationOptions?: Record<string, any>
    ): string {
      const opts =
        typeof options === 'object' && interpolationOptions
          ? { ...options, ...interpolationOptions }
          : options;

      const keys = Array.isArray(key) ? key : [key];
      for (const keyItem of keys) {
        const result = resolveKey(currentLanguage, defaultNS, keyItem, opts);
        if (result !== keyItem) return result;
      }
      const fallback =
        typeof opts === 'object' ? opts?.defaultValue : undefined;
      return (fallback ??
        (Array.isArray(key) ? (key[key.length - 1] ?? '') : key)) as string;
    },

    async changeLanguage(lng: string) {
      const previousLanguage = currentLanguage;
      currentLanguage = lng;
      emit('languageChanged', lng, previousLanguage);
      return () => {};
    },

    exists(key: string, options?: TOptions): boolean {
      const ns =
        typeof options === 'object' && options?.ns
          ? Array.isArray(options.ns)
            ? options.ns[0]
            : options.ns
          : defaultNS;
      try {
        const dictionary = getIntlayer(ns as any, currentLanguage as any);
        const path = key.includes(':') ? key.slice(key.indexOf(':') + 1) : key;
        return navigatePath(dictionary, path) != null;
      } catch {
        return false;
      }
    },

    getFixedT(lng: string | null, ns?: string | null, keyPrefix?: string) {
      const fixedLanguage = lng ?? currentLanguage;
      const fixedNamespace = ns ?? defaultNS;
      return (key: string, opts?: TOptions) => {
        const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
        return resolveKey(fixedLanguage, fixedNamespace, fullKey, opts);
      };
    },

    use(_module: any) {
      return instance;
    },

    on(event: string, handler: EventHandler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(handler);
    },

    off(event: string, handler?: EventHandler) {
      if (!handler) listeners.delete(event);
      else listeners.get(event)?.delete(handler);
    },

    emit,

    createInstance(opts?: InitOptions) {
      return createInstance({ ...instanceOptions, ...opts });
    },

    cloneInstance(opts?: InitOptions) {
      return createInstance({ ...instanceOptions, ...opts });
    },
  };

  return instance;
};
