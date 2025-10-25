import { DefaultValues } from '@intlayer/config/client';
import type {
  CookiesAttributes,
  IntlayerConfig,
  StorageAttributes,
} from '@intlayer/types';

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

export type ProcessedStorageAttributes = {
  cookies: CookieEntry[];
  localStorage: WebStorageEntry[];
  sessionStorage: WebStorageEntry[];
  headers: HeaderEntry[];
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

/**
 * Creates a cookie entry with default values for missing attributes
 */
const createCookieEntry = (
  options?: Partial<CookiesAttributes>
): CookieEntry => {
  const { name, path, expires, domain, secure, sameSite, httpOnly } =
    options ?? {};

  return {
    name: name ?? DefaultValues.Routing.COOKIE_NAME,
    attributes: {
      path,
      expires,
      domain,
      secure,
      sameSite,
      httpOnly,
    },
  };
};

/**
 * Creates a web storage entry (localStorage or sessionStorage) with default name
 */
const createWebStorageEntry = (
  options?: Partial<StorageAttributes>
): WebStorageEntry => {
  const { name } = options ?? {};

  return {
    name: name ?? DefaultValues.Routing.LOCALE_STORAGE_NAME,
  };
};

/**
 * Creates a header entry with default name
 */
const createHeaderEntry = (
  options?: Partial<StorageAttributes>
): HeaderEntry => {
  const { name } = options ?? {};

  return {
    name: name ?? DefaultValues.Routing.HEADER_NAME,
  };
};

/**
 * Determines if a storage entry is a cookie based on its properties
 */
const isCookieEntry = (entry: any): boolean => {
  return (
    entry.type === 'cookie' ||
    'sameSite' in entry ||
    'httpOnly' in entry ||
    'secure' in entry
  );
};

/**
 * Determines the storage type from a string literal
 */
const isStorageType = (
  value: string
): value is 'cookie' | 'localStorage' | 'sessionStorage' | 'header' => {
  return (
    value === 'cookie' ||
    value === 'localStorage' ||
    value === 'sessionStorage' ||
    value === 'header'
  );
};

// ============================================================================
// Main Function
// ============================================================================

/**
 * Processes a single storage entry and returns the appropriate storage attributes
 */
const processStorageEntry = (
  entry: StorageEntry
): Partial<ProcessedStorageAttributes> => {
  // Handle string literals
  if (typeof entry === 'string') {
    if (!isStorageType(entry)) {
      return { cookies: [], localStorage: [], sessionStorage: [], headers: [] };
    }

    if (entry === 'cookie') {
      return { cookies: [createCookieEntry()] };
    }

    if (entry === 'localStorage') {
      return { localStorage: [createWebStorageEntry()] };
    }

    if (entry === 'sessionStorage') {
      return { sessionStorage: [createWebStorageEntry()] };
    }

    if (entry === 'header') {
      return { headers: [createHeaderEntry()] };
    }
  }

  // Handle object entries
  if (typeof entry === 'object' && entry !== null) {
    const typedEntry = entry as CookiesAttributes | StorageAttributes;

    if (isCookieEntry(typedEntry)) {
      return { cookies: [createCookieEntry(typedEntry as CookiesAttributes)] };
    }

    // Handle localStorage
    if ('type' in typedEntry && typedEntry.type === 'localStorage') {
      const { name, ...rest } = typedEntry as StorageAttributes;
      return { localStorage: [createWebStorageEntry({ name, ...rest })] };
    }

    // Handle sessionStorage
    if ('type' in typedEntry && typedEntry.type === 'sessionStorage') {
      const { name, ...rest } = typedEntry as StorageAttributes;
      return { sessionStorage: [createWebStorageEntry({ name, ...rest })] };
    }

    // Handle header
    if ('type' in typedEntry && typedEntry.type === 'header') {
      const { name, ...rest } = typedEntry as StorageAttributes;
      return { headers: [createHeaderEntry({ name, ...rest })] };
    }

    // Default to localStorage for ambiguous objects
    const { name, ...rest } = typedEntry as Omit<StorageAttributes, 'type'>;
    return { localStorage: [createWebStorageEntry({ name, ...rest })] };
  }

  return { cookies: [], localStorage: [], sessionStorage: [], headers: [] };
};

/**
 * Merges multiple partial storage attributes into a single result
 */
const mergeStorageAttributes = (
  accumulated: ProcessedStorageAttributes,
  partial: Partial<ProcessedStorageAttributes>
): ProcessedStorageAttributes => {
  return {
    cookies: [...accumulated.cookies, ...(partial.cookies ?? [])],
    localStorage: [
      ...accumulated.localStorage,
      ...(partial.localStorage ?? []),
    ],
    sessionStorage: [
      ...accumulated.sessionStorage,
      ...(partial.sessionStorage ?? []),
    ],
    headers: [...accumulated.headers, ...(partial.headers ?? [])],
  };
};

/**
 * Extracts and normalizes storage configuration into separate arrays for each storage type
 *
 * @param options - The storage configuration from IntlayerConfig
 * @returns An object containing arrays for cookies, localStorage, and sessionStorage
 */
export const getStorageAttributes = (
  options: IntlayerConfig['routing']['storage']
): ProcessedStorageAttributes => {
  const emptyResult: ProcessedStorageAttributes = {
    cookies: [],
    localStorage: [],
    sessionStorage: [],
    headers: [],
  };

  // Storage is disabled
  if (options === false || options === undefined) {
    return emptyResult;
  }

  // Handle array of storage entries
  if (Array.isArray(options)) {
    return options.reduce<ProcessedStorageAttributes>((acc, entry) => {
      const partial = processStorageEntry(entry);
      return mergeStorageAttributes(acc, partial);
    }, emptyResult);
  }

  // Handle single storage entry
  const partial = processStorageEntry(options);

  return mergeStorageAttributes(emptyResult, partial);
};
