import configuration from '@intlayer/config/built';
import { type Locale, Locales } from '@intlayer/types';
import {
  getLocaleFromStorage,
  type LocaleStorageOptions,
} from '../utils/localeStorage';
import { localeDetector } from './localeDetector';

export enum LanguageDetector {
  Querystring = 'querystring',
  Storage = 'storage',
  Navigator = 'navigator',
  HtmlTag = 'htmlTag',
}

export const localeStorageOptions: LocaleStorageOptions = {
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
  setCookieString: (cookie) => {
    // biome-ignore lint/suspicious/noDocumentCookie: set cookie fallback
    document.cookie = cookie;
  },
  setSessionStorage: (name, value) => sessionStorage.setItem(name, value),
  setLocaleStorage: (name, value) => localStorage.setItem(name, value),
};

// Default settings for the language detector
type LanguageDetectorOptions = {
  order?: LanguageDetector[];
  lookupQuerystring?: string;
  htmlTag?: HTMLElement | null;
};

const getDefaultsOptions = (): LanguageDetectorOptions => {
  return {
    order: [
      LanguageDetector.Querystring,
      LanguageDetector.Storage,
      LanguageDetector.Navigator,
      LanguageDetector.HtmlTag,
    ],
    lookupQuerystring: 'locale',
    htmlTag: typeof document !== 'undefined' ? document.documentElement : null,
  };
};

const detectLanguage = (
  order: string[],
  options: LanguageDetectorOptions
): Record<LanguageDetector, Locale | undefined> => {
  const detected: Record<LanguageDetector, Locale | undefined> = {} as Record<
    LanguageDetector,
    Locale | undefined
  >;

  const queryStringDetector = () => {
    if (typeof window === 'undefined') return;
    const search = window.location.search || '';
    const params = new URLSearchParams(search);
    const value = params.get(options.lookupQuerystring ?? '');
    if (value) {
      detected[LanguageDetector.Querystring] = value as Locale;
    }
  };

  const storageDetector = () => {
    if (typeof window === 'undefined') return;

    const locale = getLocaleFromStorage({
      getCookie: (name: string) => {
        try {
          const cookies = document.cookie.split(';');
          const cookieName = `${name}=`;
          const cookie = cookies.find((c) => c.trim().startsWith(cookieName));
          if (cookie) {
            return cookie.split('=')[1].trim();
          }
        } catch {}
        return undefined;
      },
      getSessionStorage: (name: string) => {
        try {
          return window.sessionStorage.getItem(name) ?? undefined;
        } catch {}
        return undefined;
      },
      getLocaleStorage: (name: string) => {
        try {
          return window.localStorage.getItem(name) ?? undefined;
        } catch {}
        return undefined;
      },
    });

    if (locale) {
      detected[LanguageDetector.Storage] = locale;
    }
  };

  const navigatorDetector = () => {
    if (typeof navigator === 'undefined') return;

    const { internationalization } = configuration;
    const languages = navigator.languages ?? [navigator.language];

    // Use localeDetector to find the best matching locale
    const locale = localeDetector(
      { 'accept-language': languages.join(',') },
      internationalization.locales,
      internationalization.defaultLocale
    );

    if (locale) {
      detected[LanguageDetector.Navigator] = locale;
    }
  };

  const htmlTagDetector = () => {
    const htmlTag = options.htmlTag;
    if (htmlTag && typeof htmlTag.getAttribute === 'function') {
      const lang = htmlTag.getAttribute('lang');
      if (lang) {
        const { internationalization } = configuration;

        // Validate and resolve the locale
        const locale = localeDetector(
          { 'accept-language': lang },
          internationalization.locales,
          internationalization.defaultLocale
        );

        detected[LanguageDetector.HtmlTag] = locale;
      }
    }
  };

  // Map detector names to their corresponding functions
  const detectors: Record<string, () => void> = {
    [LanguageDetector.Querystring]: queryStringDetector,
    [LanguageDetector.Storage]: storageDetector,
    [LanguageDetector.Navigator]: navigatorDetector,
    [LanguageDetector.HtmlTag]: htmlTagDetector,
  };

  // Use the provided order to run each detector
  order.forEach((detectorName) => {
    detectors[detectorName]?.();
  });

  return detected;
};

const getFirstAvailableLocale = (
  locales: Record<LanguageDetector, Locale | undefined>,
  order: LanguageDetector[]
): Locale => {
  const { internationalization } = configuration;

  for (const detector of order) {
    const locale = locales[detector];

    if (locale && internationalization.locales.includes(locale)) {
      return locale;
    }
  }

  return internationalization?.defaultLocale ?? Locales.ENGLISH;
};

/**
 * Core language detector function for browser environments.
 *
 * Detects the user's preferred locale by checking multiple sources in order:
 * 1. Query string parameter
 * 2. Storage (cookies, localStorage, sessionStorage) - uses getLocaleFromStorage
 * 3. Navigator languages - uses localeDetector
 * 4. HTML lang attribute - uses localeDetector
 *
 * @param userOptions - Optional configuration for detection order and lookup keys
 * @returns The detected locale or the default locale
 *
 * @example
 * const locale = getBrowserLocale({ order: [LanguageDetector.Storage, LanguageDetector.Navigator] });
 */
export const getBrowserLocale = (
  userOptions: LanguageDetectorOptions | undefined = {}
): Locale => {
  const options = { ...getDefaultsOptions(), ...userOptions };

  const locales = detectLanguage(options.order ?? [], options);

  return getFirstAvailableLocale(locales, options.order ?? []);
};
