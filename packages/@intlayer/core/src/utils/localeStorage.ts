import { internationalization, routing } from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { buildCookieString, resolveExpiresToTimestamp } from './cookieExpiry';
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
  /**
   * Absolute expiry as milliseconds since epoch, ready for `cookieStore.set()`.
   * Already resolved from the normalized `expires` by
   * `resolveExpiresToTimestamp`.
   */
  expires?: number | undefined;
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

// cookieStore is part of the experimental Cookie Store API
declare const cookieStore: any;

export const localeStorageOptions: LocaleStorageClientOptions = {
  getCookie: (name: string) =>
    document.cookie
      .split(';')
      .find((c) => c.trim().startsWith(`${name}=`))
      ?.split('=')[1],
  getLocaleStorage: (name: string) => localStorage.getItem(name),
  getSessionStorage: (name: string) => sessionStorage.getItem(name),
  isCookieEnabled: true,
  setCookieStore: (name, value, attributes) =>
    cookieStore.set({
      name,
      value,
      path: attributes.path,
      domain: attributes.domain,
      expires: attributes.expires,
      sameSite: attributes.sameSite,
    }),
  setCookieString: (_name, cookie) => {
    // biome-ignore lint/suspicious/noDocumentCookie: set cookie fallback
    document.cookie = cookie;
  },
  setSessionStorage: (name, value) => sessionStorage.setItem(name, value),
  setLocaleStorage: (name, value) => localStorage.setItem(name, value),
};

/**
 * Retrieves the locale from browser storage mechanisms
 * (cookies, localStorage, sessionStorage).
 * Does not read from headers — use `getLocaleFromStorageServer` for that.
 */
export const getLocaleFromStorageClient = (
  options: LocaleStorageClientOptions = localeStorageOptions
): Locale | undefined => {
  const { locales } = internationalization;

  if (options?.isCookieEnabled === false) return undefined;

  const isValidLocale = (value: string | null | undefined): value is Locale =>
    !!value && locales.includes(value as Locale);

  if (!TREE_SHAKE_STORAGE_COOKIES) {
    for (let i = 0; i < (routing.storage.cookies ?? []).length; i++) {
      try {
        const value = options?.getCookie?.(routing.storage.cookies![i].name);
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE) {
    for (let i = 0; i < (routing.storage.localStorage ?? []).length; i++) {
      try {
        const value = options?.getLocaleStorage?.(
          routing.storage.localStorage![i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_SESSION_STORAGE && routing.storage.sessionStorage) {
    for (let i = 0; i < routing.storage.sessionStorage.length; i++) {
      try {
        const value = options?.getSessionStorage?.(
          routing.storage.sessionStorage[i].name
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
  if (options?.isCookieEnabled === false) return;

  if (!TREE_SHAKE_STORAGE_COOKIES && routing.storage.cookies) {
    for (let i = 0; i < routing.storage.cookies.length; i++) {
      const { name, attributes } = routing.storage.cookies[i];
      try {
        if (options?.setCookieStore) {
          options.setCookieStore(name, locale, {
            ...attributes,
            expires: resolveExpiresToTimestamp(attributes.expires),
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

  if (
    !TREE_SHAKE_STORAGE_LOCAL_STORAGE &&
    routing.storage.localStorage &&
    options?.setLocaleStorage
  ) {
    for (let i = 0; i < routing.storage.localStorage.length; i++) {
      const { name } = routing.storage.localStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getLocaleStorage) {
          if (options.getLocaleStorage(name)) continue;
        }
        options.setLocaleStorage(name, locale);
      } catch {}
    }
  }

  if (
    !TREE_SHAKE_STORAGE_SESSION_STORAGE &&
    routing.storage.sessionStorage &&
    options?.setSessionStorage
  ) {
    for (let i = 0; i < routing.storage.sessionStorage.length; i++) {
      const { name } = routing.storage.sessionStorage[i];
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
  const { locales } = internationalization;

  if (options?.isCookieEnabled === false) return undefined;

  const isValidLocale = (value: string | null | undefined): value is Locale =>
    !!value && locales.includes(value as Locale);

  if (!TREE_SHAKE_STORAGE_COOKIES && routing.storage.cookies) {
    for (let i = 0; i < routing.storage.cookies.length; i++) {
      try {
        const value = options?.getCookie?.(routing.storage.cookies[i].name);
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_HEADERS && routing.storage.headers) {
    for (let i = 0; i < routing.storage.headers.length; i++) {
      try {
        const value = options?.getHeader?.(routing.storage.headers[i].name);
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
  if (options?.isCookieEnabled === false) return;

  if (!TREE_SHAKE_STORAGE_COOKIES && routing.storage.cookies) {
    for (let i = 0; i < routing.storage.cookies.length; i++) {
      const { name, attributes } = routing.storage.cookies[i];

      try {
        if (options?.setCookieStore) {
          options.setCookieStore(name, locale, {
            ...attributes,
            expires: resolveExpiresToTimestamp(attributes.expires),
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

  if (
    !TREE_SHAKE_STORAGE_HEADERS &&
    routing.storage.headers &&
    options?.setHeader
  ) {
    for (let i = 0; i < routing.storage.headers.length; i++) {
      try {
        options.setHeader(routing.storage.headers[i].name, locale);
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
  const { locales } = internationalization;

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

  if (!TREE_SHAKE_STORAGE_COOKIES && routing.storage.cookies) {
    for (let i = 0; i < routing.storage.cookies.length; i++) {
      const value = readCookie(routing.storage.cookies[i].name);
      if (isValidLocale(value)) return value;
    }
  }

  if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE && routing.storage.localStorage) {
    for (let i = 0; i < routing.storage.localStorage.length; i++) {
      try {
        const value = options?.getLocaleStorage?.(
          routing.storage.localStorage[i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_SESSION_STORAGE && routing.storage.sessionStorage) {
    for (let i = 0; i < routing.storage.sessionStorage.length; i++) {
      try {
        const value = options?.getSessionStorage?.(
          routing.storage.sessionStorage[i].name
        );
        if (isValidLocale(value)) return value;
      } catch {}
    }
  }

  if (!TREE_SHAKE_STORAGE_HEADERS && routing.storage.headers) {
    for (let i = 0; i < routing.storage.headers.length; i++) {
      try {
        const value = options?.getHeader?.(routing.storage.headers[i].name);
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
  if (options?.isCookieEnabled === false) return;

  if (!TREE_SHAKE_STORAGE_COOKIES && routing.storage.cookies) {
    for (let i = 0; i < routing.storage.cookies.length; i++) {
      const { name, attributes } = routing.storage.cookies[i];
      try {
        if (options?.setCookieStore) {
          options.setCookieStore(name, locale, {
            ...attributes,
            expires: resolveExpiresToTimestamp(attributes.expires),
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

  if (
    !TREE_SHAKE_STORAGE_LOCAL_STORAGE &&
    routing.storage.localStorage &&
    options?.setLocaleStorage
  ) {
    for (let i = 0; i < routing.storage.localStorage.length; i++) {
      const { name } = routing.storage.localStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getLocaleStorage) {
          if (options.getLocaleStorage(name)) continue;
        }
        options.setLocaleStorage(name, locale);
      } catch {}
    }
  }

  if (
    !TREE_SHAKE_STORAGE_SESSION_STORAGE &&
    routing.storage.sessionStorage &&
    options?.setSessionStorage
  ) {
    for (let i = 0; i < routing.storage.sessionStorage.length; i++) {
      const { name } = routing.storage.sessionStorage[i];
      try {
        if (!(options?.overwrite ?? true) && options?.getSessionStorage) {
          if (options.getSessionStorage(name)) continue;
        }
        options.setSessionStorage(name, locale);
      } catch {}
    }
  }

  if (
    !TREE_SHAKE_STORAGE_HEADERS &&
    routing.storage.headers &&
    options?.setHeader
  ) {
    for (let i = 0; i < routing.storage.headers.length; i++) {
      try {
        options.setHeader(routing.storage.headers[i].name, locale);
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
