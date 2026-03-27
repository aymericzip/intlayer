import type {
  CookiesAttributes,
  ProcessedStorageAttributes,
  RoutingStorageInput,
  StorageAttributes,
} from '@intlayer/types/config';
import {
  COOKIE_NAME,
  HEADER_NAME,
  LOCALE_STORAGE_NAME,
} from '../defaultValues/routing';

// ============================================================================
// Types
// ============================================================================

type CookieEntry = {
  name: string;
  attributes: Omit<CookiesAttributes, 'type' | 'name'>;
};

type WebStorageEntry = {
  name: string;
};

type HeaderEntry = {
  name: string;
};

type StorageEntry =
  | 'cookie'
  | 'localStorage'
  | 'sessionStorage'
  | 'header'
  | CookiesAttributes
  | StorageAttributes;

// ============================================================================
// Helper Functions
// ============================================================================

const createCookieEntry = (
  options?: Partial<CookiesAttributes>
): CookieEntry => {
  const { name, path, expires, domain, secure, sameSite, httpOnly } =
    options ?? {};
  return {
    name: name ?? COOKIE_NAME,
    attributes: { path, expires, domain, secure, sameSite, httpOnly },
  };
};

const createWebStorageEntry = (
  options?: Partial<StorageAttributes>
): WebStorageEntry => ({
  name: options?.name ?? LOCALE_STORAGE_NAME,
});

const createHeaderEntry = (
  options?: Partial<StorageAttributes>
): HeaderEntry => ({
  name: options?.name ?? HEADER_NAME,
});

const isCookieEntry = (entry: unknown): boolean => {
  if (typeof entry !== 'object' || entry === null) return false;
  const e = entry as Record<string, unknown>;
  return (
    e['type'] === 'cookie' ||
    'sameSite' in e ||
    'httpOnly' in e ||
    'secure' in e
  );
};

const isStorageType = (
  value: string
): value is 'cookie' | 'localStorage' | 'sessionStorage' | 'header' =>
  value === 'cookie' ||
  value === 'localStorage' ||
  value === 'sessionStorage' ||
  value === 'header';

// ============================================================================
// Main Function
// ============================================================================

const processStorageEntry = (
  entry: StorageEntry
): Partial<ProcessedStorageAttributes> => {
  if (typeof entry === 'string') {
    if (!isStorageType(entry)) {
      return { cookies: [], localStorage: [], sessionStorage: [], headers: [] };
    }
    if (entry === 'cookie') return { cookies: [createCookieEntry()] };
    if (entry === 'localStorage')
      return { localStorage: [createWebStorageEntry()] };
    if (entry === 'sessionStorage')
      return { sessionStorage: [createWebStorageEntry()] };
    if (entry === 'header') return { headers: [createHeaderEntry()] };
  }

  if (typeof entry === 'object' && entry !== null) {
    const typedEntry = entry as CookiesAttributes | StorageAttributes;

    if (isCookieEntry(typedEntry)) {
      return { cookies: [createCookieEntry(typedEntry as CookiesAttributes)] };
    }
    if ('type' in typedEntry && typedEntry.type === 'localStorage') {
      return {
        localStorage: [createWebStorageEntry(typedEntry as StorageAttributes)],
      };
    }
    if ('type' in typedEntry && typedEntry.type === 'sessionStorage') {
      return {
        sessionStorage: [
          createWebStorageEntry(typedEntry as StorageAttributes),
        ],
      };
    }
    if ('type' in typedEntry && typedEntry.type === 'header') {
      return { headers: [createHeaderEntry(typedEntry as StorageAttributes)] };
    }
    // Default to localStorage for ambiguous objects
    return {
      localStorage: [
        createWebStorageEntry(typedEntry as Omit<StorageAttributes, 'type'>),
      ],
    };
  }

  return { cookies: [], localStorage: [], sessionStorage: [], headers: [] };
};

const mergeStorageAttributes = (
  accumulated: ProcessedStorageAttributes,
  partial: Partial<ProcessedStorageAttributes>
): ProcessedStorageAttributes => ({
  cookies: [...accumulated.cookies, ...(partial.cookies ?? [])],
  localStorage: [...accumulated.localStorage, ...(partial.localStorage ?? [])],
  sessionStorage: [
    ...accumulated.sessionStorage,
    ...(partial.sessionStorage ?? []),
  ],
  headers: [...accumulated.headers, ...(partial.headers ?? [])],
});

/**
 * Extracts and normalizes storage configuration into separate arrays for each storage type.
 * Called at config-build time so the result is pre-computed and stored in the config.
 *
 * @param options - The storage configuration from IntlayerConfig
 * @returns An object containing arrays for cookies, localStorage, sessionStorage and headers
 */
export const getStorageAttributes = (
  options: RoutingStorageInput
): ProcessedStorageAttributes => {
  const emptyResult: ProcessedStorageAttributes = {
    cookies: [],
    localStorage: [],
    sessionStorage: [],
    headers: [],
  };

  if (options === false || options === undefined) return emptyResult;

  if (Array.isArray(options)) {
    return options.reduce<ProcessedStorageAttributes>((acc, entry) => {
      const partial = processStorageEntry(entry);
      return mergeStorageAttributes(acc, partial);
    }, emptyResult);
  }

  return mergeStorageAttributes(emptyResult, processStorageEntry(options));
};
