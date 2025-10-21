import { DefaultValues } from '@intlayer/config/client';
import type {
  CookiesAttributes,
  IntlayerConfig,
  LocaleStorageAttributes,
} from '@intlayer/types';

type CookiesAttributesWithName = {
  type: 'cookie';
  name: string;
  attributes: Omit<CookiesAttributes, 'name' | 'type'>;
};

const getCookieAttributes = (
  options?: Partial<CookiesAttributes>
): CookiesAttributesWithName => {
  const { name, path, expires, domain, secure, sameSite, httpOnly } =
    options ?? {};
  return {
    type: 'cookie',
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

type LocaleStorageAttributesWithName = {
  name: string;
};

export const getLocaleStorageAttributes = (
  options?: Partial<LocaleStorageAttributes>
): LocaleStorageAttributesWithName => {
  const { name } = options ?? {};
  return {
    name: name ?? DefaultValues.Routing.LOCALE_STORAGE_NAME,
  };
};

type StorageAttributes = {
  cookies: {
    name: string;
    attributes: Omit<CookiesAttributes, 'type' | 'name'>;
  }[];
  localStorage: {
    name: string;
  }[];
  sessionStorage: {
    name: string;
  }[];
};

export const getStorageAttributes = (
  options: IntlayerConfig['routing']['storage']
): StorageAttributes => {
  const result: StorageAttributes = {
    cookies: [],
    localStorage: [],
    sessionStorage: [],
  };

  // Disabled storage
  if (options === false || options === undefined) {
    return result;
  }

  const pushCookie = (cookiesAttributes?: CookiesAttributes | 'cookie') => {
    const base = getCookieAttributes(
      typeof cookiesAttributes === 'string'
        ? undefined
        : (cookiesAttributes as Partial<CookiesAttributes>)
    );
    result.cookies.push({
      name: base.name,
      attributes: base.attributes,
    });
  };

  const pushWebStorage = (
    type: 'localStorage' | 'sessionStorage',
    conf?: Partial<LocaleStorageAttributes>
  ) => {
    const base = getLocaleStorageAttributes(conf);

    if (type === 'localStorage') {
      result.localStorage.push({
        name: base.name ?? DefaultValues.Routing.LOCALE_STORAGE_NAME,
      });
    } else {
      result.sessionStorage.push({
        name: base.name ?? DefaultValues.Routing.LOCALE_STORAGE_NAME,
      });
    }
  };

  const handleOne = (
    entry:
      | 'cookie'
      | 'localStorage'
      | 'sessionStorage'
      | LocaleStorageAttributes
      | CookiesAttributes
  ) => {
    if (typeof entry === 'string') {
      if (entry === 'cookie') return pushCookie('cookie');
      if (entry === 'localStorage') return pushWebStorage('localStorage');
      if (entry === 'sessionStorage') return pushWebStorage('sessionStorage');
      return;
    }

    // Object-like entries
    const typed: any = entry as any;
    if (typed.type === 'cookie') {
      return pushCookie(entry as CookiesAttributes);
    }
    if (typed.type === 'localStorage') {
      const { name, type: _t, ...rest } = entry as LocaleStorageAttributes;
      return pushWebStorage('localStorage', { name, ...(rest as any) });
    }
    if (typed.type === 'sessionStorage') {
      const { name, type: _t, ...rest } = entry as LocaleStorageAttributes;
      return pushWebStorage('sessionStorage', { name, ...(rest as any) });
    }

    // Fallback heuristics (if type is missing):
    if ('sameSite' in typed || 'httpOnly' in typed || 'secure' in typed) {
      return pushCookie(entry as CookiesAttributes);
    }
    // Assume localStorage by default
    const { name, ...rest } = entry as Omit<LocaleStorageAttributes, 'type'>;
    return pushWebStorage('localStorage', { name, ...(rest as any) });
  };

  if (Array.isArray(options)) {
    options.forEach(handleOne);
    return result;
  }

  if (typeof options === 'string') {
    handleOne(options);
    return result;
  }

  // Single object case
  handleOne(options as CookiesAttributes | LocaleStorageAttributes);
  return result;
};
