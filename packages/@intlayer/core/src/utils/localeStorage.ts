import configuration from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { CookiesAttributes } from '@intlayer/types/config';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getCookie } from './getCookie';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when cookie storage is explicitly disabled at build time.
 */
const TREE_SHAKE_STORAGE_COOKIES =
  process.env['INTLAYER_ROUTING_STORAGE_COOKIES'] === 'false';

/**
 * True when localStorage is explicitly disabled at build time.
 */
const TREE_SHAKE_STORAGE_LOCAL_STORAGE =
  process.env['INTLAYER_ROUTING_STORAGE_LOCALSTORAGE'] === 'false';

/**
 * True when sessionStorage is explicitly disabled at build time.
 */
const TREE_SHAKE_STORAGE_SESSION_STORAGE =
  process.env['INTLAYER_ROUTING_STORAGE_SESSIONSTORAGE'] === 'false';

/**
 * True when header storage is explicitly disabled at build time.
 */
const TREE_SHAKE_STORAGE_HEADERS =
  process.env['INTLAYER_ROUTING_STORAGE_HEADERS'] === 'false';

// ============================================================================
// Shared types
// ============================================================================

export type CookieBuildAttributes = {
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  /** Expiry as milliseconds since epoch (Date.getTime()) or number of days */
  expires?: number | undefined;
};

// ============================================================================
// Shared helpers
// ============================================================================

const buildCookieString = (
  name: string,
  value: string,
  attributes: Omit<CookiesAttributes, 'name' | 'type'>
): string => {
  const encodedValue = encodeURIComponent(value);
  const parts: string[] = [`${name}=${encodedValue}`];

  if (attributes.path) parts.push(`Path=${attributes.path}`);
  if (attributes.domain) parts.push(`Domain=${attributes.domain}`);
  if (attributes.expires instanceof Date)
    parts.push(`Expires=${attributes.expires.toUTCString()}`);
  if (attributes.secure) parts.push('Secure');
  if (attributes.sameSite) parts.push(`SameSite=${attributes.sameSite}`);
  return parts.join('; ');
};

// ============================================================================
// Client-specific types and functions
// (cookies via browser APIs, localStorage, sessionStorage — no headers)
// ============================================================================

export type LocaleStorageClientOptions = {
  overwrite?: boolean;
  isCookieEnabled?: boolean;
  setCookieStore?: (
    name: string,
    value: string,
    cookie: CookieBuildAttributes
  ) => void;
  setCookieString?: (name: string, cookie: string) => void;
  getCookie?: (name: string) => string | undefined | null;
  setSessionStorage?: (name: string, value: string) => void;
  getSessionStorage?: (name: string) => string | undefined | null;
  setLocaleStorage?: (name: string, value: string) => void;
  getLocaleStorage?: (name: string) => string | undefined | null;
};

/**
 * Retrieves the locale from browser storage mechanisms
 * (cookies, localStorage, sessionStorage).
 * Does not read from headers — use `getLocaleFromStorageServer` for that.
 */
export const getLocaleFromStorageClient = (
  options: LocaleStorageClientOptions
): Locale | undefined => {
  const { routing, internationalization } = configuration;
  const { locales } = internationalization;
  const storageAttributes = routing.storage;

  if (options?.isCookieEnabled === false) return undefined;

  const isValidLocale = (value: string | null | undefined): value is Locale =>
    !!value && locales.includes(value as Locale);

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < storageAttributes.cookies.length; i++) {
      try {
        const value = options?.getCookie?.(storageAttributes.cookies[i].name);
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE) {
    for (let i = 0; i < storageAttributes.localStorage.length; i++) {
      try {
        const value = options?.getLocaleStorage?.(
          storageAttributes.localStorage[i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_SESSION_STORAGE) {
    for (let i = 0; i < storageAttributes.sessionStorage.length; i++) {
      try {
        const value = options?.getSessionStorage?.(
          storageAttributes.sessionStorage[i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }
};

/**
 * Stores the locale in browser storage mechanisms
 * (cookies, localStorage, sessionStorage).
 * Does not write to headers — use `setLocaleInStorageServer` for that.
 */
export const setLocaleInStorageClient = (
  locale: LocalesValues,
  options?: LocaleStorageClientOptions
): void => {
  const { routing } = configuration;
  const storageAttributes = routing.storage;

  if (options?.isCookieEnabled === false) return;

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < storageAttributes.cookies.length; i++) {
      const { name, attributes } = storageAttributes.cookies[i];
      try {
        if (options?.setCookieStore) {
          options.setCookieStore(name, locale, {
            ...attributes,
            expires:
              attributes.expires instanceof Date
                ? attributes.expires.getTime()
                : attributes.expires,
          });
        }
      } catch {
        try {
          if (options?.setCookieString) {
            options.setCookieString(
              name,
              buildCookieString(name, locale, attributes)
            );
          }
        } catch {}
      }
    }
  }

  if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE && options?.setLocaleStorage) {
    for (let i = 0; i < storageAttributes.localStorage.length; i++) {
      const { name } = storageAttributes.localStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getLocaleStorage) {
          if (options.getLocaleStorage(name)) continue;
        }
        options.setLocaleStorage(name, locale);
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_SESSION_STORAGE && options?.setSessionStorage) {
    for (let i = 0; i < storageAttributes.sessionStorage.length; i++) {
      const { name } = storageAttributes.sessionStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getSessionStorage) {
          if (options.getSessionStorage(name)) continue;
        }
        options.setSessionStorage(name, locale);
      } catch {}
    }
  }
};

/**
 * Client-side locale storage utility.
 * Handles cookies (browser), localStorage and sessionStorage.
 * Does not access headers.
 *
 * @example
 * ```ts
 * const storage = LocaleStorageClient(localeStorageOptions);
 * const locale = storage.getLocale();
 * storage.setLocale('fr');
 * ```
 */
export const LocaleStorageClient = (options: LocaleStorageClientOptions) => ({
  getLocale: () => getLocaleFromStorageClient(options),
  setLocale: (locale: LocalesValues) =>
    setLocaleInStorageClient(locale, options),
});

// ============================================================================
// Server-specific types and functions
// (cookies via injected getter/setter, headers — no localStorage/sessionStorage)
// ============================================================================

export type LocaleStorageServerOptions = {
  overwrite?: boolean;
  isCookieEnabled?: boolean;
  setCookieStore?: (
    name: string,
    value: string,
    cookie: CookieBuildAttributes
  ) => void;
  setCookieString?: (name: string, cookie: string) => void;
  getCookie?: (name: string) => string | undefined | null;
  getHeader?: (name: string) => string | undefined | null;
  setHeader?: (name: string, value: string) => void;
};

/**
 * Retrieves the locale from server-side storage mechanisms (cookies, headers).
 * Does not access localStorage or sessionStorage.
 * No browser cookie fallback — the caller must provide `getCookie`.
 */
export const getLocaleFromStorageServer = (
  options: LocaleStorageServerOptions
): Locale | undefined => {
  const { routing, internationalization } = configuration;
  const { locales } = internationalization;
  const storageAttributes = routing.storage;

  if (options?.isCookieEnabled === false) return undefined;

  const isValidLocale = (value: string | null | undefined): value is Locale =>
    !!value && locales.includes(value as Locale);

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < storageAttributes.cookies.length; i++) {
      try {
        const value = options?.getCookie?.(storageAttributes.cookies[i].name);
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_HEADERS) {
    for (let i = 0; i < storageAttributes.headers.length; i++) {
      try {
        const value = options?.getHeader?.(storageAttributes.headers[i].name);
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }
};

/**
 * Stores the locale in server-side storage mechanisms (cookies, headers).
 * Does not write to localStorage or sessionStorage.
 */
export const setLocaleInStorageServer = (
  locale: LocalesValues,
  options?: LocaleStorageServerOptions
): void => {
  const { routing } = configuration;
  const storageAttributes = routing.storage;

  if (options?.isCookieEnabled === false) return;

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < storageAttributes.cookies.length; i++) {
      const { name, attributes } = storageAttributes.cookies[i];
      try {
        if (options?.setCookieStore) {
          options.setCookieStore(name, locale, {
            ...attributes,
            expires:
              attributes.expires instanceof Date
                ? attributes.expires.getTime()
                : attributes.expires,
          });
        }
      } catch {
        try {
          if (options?.setCookieString) {
            options.setCookieString(
              name,
              buildCookieString(name, locale, attributes)
            );
          }
        } catch {}
      }
    }
  }

  if (!TREE_SHAKE_STORAGE_HEADERS && options?.setHeader) {
    for (let i = 0; i < storageAttributes.headers.length; i++) {
      try {
        options.setHeader(storageAttributes.headers[i].name, locale);
      } catch {}
    }
  }
};

/**
 * Server-side locale storage utility.
 * Handles cookies (via injected getter/setter) and headers.
 * Does not access localStorage or sessionStorage.
 *
 * @example
 * ```ts
 * const storage = LocaleStorageServer({
 *   getCookie: (name) => req.cookies[name],
 *   setCookieStore: (name, value, attrs) => res.cookie(name, value, attrs),
 *   getHeader: (name) => req.headers[name],
 *   setHeader: (name, value) => res.setHeader(name, value),
 * });
 * const locale = storage.getLocale();
 * storage.setLocale('fr');
 * ```
 */
export const LocaleStorageServer = (options: LocaleStorageServerOptions) => ({
  getLocale: () => getLocaleFromStorageServer(options),
  setLocale: (locale: LocalesValues) =>
    setLocaleInStorageServer(locale, options),
});

// ============================================================================
// Deprecated: combined LocaleStorage
// Use LocaleStorageClient or LocaleStorageServer instead
// ============================================================================

/**
 * @deprecated Use {@link LocaleStorageClientOptions} or {@link LocaleStorageServerOptions} instead.
 */
export type LocaleStorageOptions = LocaleStorageClientOptions &
  LocaleStorageServerOptions;

/**
 * Retrieves the locale from all storage mechanisms
 * (cookies, localStorage, sessionStorage, headers).
 *
 * @deprecated Use {@link getLocaleFromStorageClient} (browser) or
 * {@link getLocaleFromStorageServer} (server) instead.
 */
export const getLocaleFromStorage = (
  options: Pick<
    LocaleStorageOptions,
    | 'getCookie'
    | 'getSessionStorage'
    | 'getLocaleStorage'
    | 'getHeader'
    | 'isCookieEnabled'
  >
): Locale | undefined => {
  const { routing, internationalization } = configuration;
  const { locales } = internationalization;
  const storageAttributes = routing.storage;

  if (options?.isCookieEnabled === false) return undefined;

  const isValidLocale = (value: string | null | undefined): value is Locale =>
    !!value && locales.includes(value as Locale);

  const readCookie = (name: string): string | undefined => {
    try {
      const fromOption = options?.getCookie?.(name);
      if (fromOption !== null && fromOption !== undefined) return fromOption;
    } catch {}
    // Browser fallback kept for backward compatibility
    return getCookie(name);
  };

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < storageAttributes.cookies.length; i++) {
      const value = readCookie(storageAttributes.cookies[i].name);
      if (isValidLocale(value)) return value;
    }
  }

  if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE) {
    for (let i = 0; i < storageAttributes.localStorage.length; i++) {
      try {
        const value = options?.getLocaleStorage?.(
          storageAttributes.localStorage[i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_SESSION_STORAGE) {
    for (let i = 0; i < storageAttributes.sessionStorage.length; i++) {
      try {
        const value = options?.getSessionStorage?.(
          storageAttributes.sessionStorage[i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_HEADERS) {
    for (let i = 0; i < storageAttributes.headers.length; i++) {
      try {
        const value = options?.getHeader?.(storageAttributes.headers[i].name);
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }
};

/**
 * Stores the locale in all configured storage mechanisms
 * (cookies, localStorage, sessionStorage, headers).
 *
 * @deprecated Use {@link setLocaleInStorageClient} (browser) or
 * {@link setLocaleInStorageServer} (server) instead.
 */
export const setLocaleInStorage = (
  locale: LocalesValues,
  options?: LocaleStorageOptions
): void => {
  const { routing } = configuration;
  const storageAttributes = routing.storage;

  if (options?.isCookieEnabled === false) return;

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < storageAttributes.cookies.length; i++) {
      const { name, attributes } = storageAttributes.cookies[i];
      try {
        if (options?.setCookieStore) {
          options.setCookieStore(name, locale, {
            ...attributes,
            expires:
              attributes.expires instanceof Date
                ? attributes.expires.getTime()
                : attributes.expires,
          });
        }
      } catch {
        try {
          if (options?.setCookieString) {
            options.setCookieString(
              name,
              buildCookieString(name, locale, attributes)
            );
          }
        } catch {}
      }
    }
  }

  if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE && options?.setLocaleStorage) {
    for (let i = 0; i < storageAttributes.localStorage.length; i++) {
      const { name } = storageAttributes.localStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getLocaleStorage) {
          if (options.getLocaleStorage(name)) continue;
        }
        options.setLocaleStorage(name, locale);
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_SESSION_STORAGE && options?.setSessionStorage) {
    for (let i = 0; i < storageAttributes.sessionStorage.length; i++) {
      const { name } = storageAttributes.sessionStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getSessionStorage) {
          if (options.getSessionStorage(name)) continue;
        }
        options.setSessionStorage(name, locale);
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_HEADERS && options?.setHeader) {
    for (let i = 0; i < storageAttributes.headers.length; i++) {
      try {
        options.setHeader(storageAttributes.headers[i].name, locale);
      } catch {}
    }
  }
};

/**
 * Utility object to get and set the locale in storage based on configuration.
 *
 * @deprecated Use {@link LocaleStorageClient} (browser) or
 * {@link LocaleStorageServer} (server) instead.
 */
export const LocaleStorage = (options: LocaleStorageOptions) => ({
  getLocale: () => getLocaleFromStorage(options),
  setLocale: (locale: LocalesValues) => setLocaleInStorage(locale, options),
});
