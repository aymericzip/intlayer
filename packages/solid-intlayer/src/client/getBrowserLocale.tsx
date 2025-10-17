import configuration from '@intlayer/config/built';
import { Locales } from '@intlayer/types';

export enum LanguageDetector {
  Querystring = 'querystring',
  Cookie = 'cookie',
  LocalStorage = 'localStorage',
  SessionStorage = 'sessionStorage',
  Navigator = 'navigator',
  HtmlTag = 'htmlTag',
}

// Default settings for the language detector
type LanguageDetectorOptions = {
  order?: LanguageDetector[];
  lookupQuerystring?: string;
  lookupCookie?: string;
  lookupLocalStorage?: string;
  lookupSessionStorage?: string;
  excludeCacheFor?: string[];
  htmlTag?: HTMLElement | null;
};

const getDefaultsOptions = (): LanguageDetectorOptions => {
  const { middleware } = configuration;

  return {
    order: [
      LanguageDetector.Querystring,
      LanguageDetector.Cookie,
      LanguageDetector.Navigator,
      LanguageDetector.HtmlTag,
    ],
    lookupQuerystring: 'locale',
    lookupCookie: middleware?.cookieName,
    htmlTag: document.documentElement,
  };
};

// Helper functions for various checks and operations
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const testKey = 'intlayer.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const isSessionStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const testKey = 'intlayer.translate.boo';
    window.sessionStorage.setItem(testKey, 'foo');
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// Function to detect language using different detectors
const detectLanguage = (
  order: string[],
  options: LanguageDetectorOptions
): Record<LanguageDetector, Locales | Locales[]> => {
  const detected: Record<LanguageDetector, Locales | Locales[]> = {} as Record<
    LanguageDetector,
    Locales | Locales[]
  >;

  const queryStringDetector = () => {
    if (typeof window === 'undefined') return;
    const search = window.location.search || '';
    const params = new URLSearchParams(search);
    const value = params.get(options.lookupQuerystring ?? '');
    if (value) {
      detected[LanguageDetector.Querystring] = value as Locales;
    }
  };

  const cookieDetector = () => {
    if (typeof document === 'undefined') return;
    const cookies = document.cookie.split(';');
    const cookieName = `${options.lookupCookie ?? ''}=`;
    const cookie = cookies.find((c) => c.trim().startsWith(cookieName));
    if (cookie) {
      const value = cookie.split('=')[1].trim();

      detected[LanguageDetector.Cookie] = value as Locales;
    }
  };

  const localStorageDetector = () => {
    if (!isLocalStorageAvailable()) return;
    const value = window.localStorage.getItem(options.lookupLocalStorage ?? '');
    if (value) {
      detected[LanguageDetector.LocalStorage] = value as Locales;
    }
  };

  const sessionStorageDetector = () => {
    if (!isSessionStorageAvailable()) return;
    const value = window.sessionStorage.getItem(
      options.lookupSessionStorage ?? ''
    );
    if (value) {
      detected[LanguageDetector.SessionStorage] = value as Locales;
    }
  };

  const navigatorDetector = () => {
    if (typeof navigator === 'undefined') return;

    if (navigator.language) {
      detected[LanguageDetector.Navigator] = navigator.language as Locales;
    }
  };

  const htmlTagDetector = () => {
    const htmlTag = options.htmlTag;
    if (htmlTag && typeof htmlTag.getAttribute === 'function') {
      const lang = htmlTag.getAttribute('lang');
      if (lang) {
        detected[LanguageDetector.HtmlTag] = lang as Locales;
      }
    }
  };

  // Map detector names to their corresponding functions
  const detectors: Record<string, () => void> = {
    [LanguageDetector.Querystring]: queryStringDetector,
    [LanguageDetector.Cookie]: cookieDetector,
    [LanguageDetector.LocalStorage]: localStorageDetector,
    [LanguageDetector.SessionStorage]: sessionStorageDetector,
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
  locales: Record<LanguageDetector, Locales | Locales[]>,
  order: LanguageDetector[]
): Locales => {
  const { internationalization } = configuration;

  for (const detector of order) {
    const localesArray = [locales[detector]].flat();

    for (const locale of localesArray) {
      if (locale && (internationalization?.locales).includes(locale)) {
        return locale;
      } else if (
        locale?.includes('-') &&
        (internationalization?.locales).includes(
          locale.split('-')[0] as Locales
        )
      ) {
        return locale.split('-')[0] as Locales;
      }
    }
  }

  return internationalization?.defaultLocale ?? Locales.ENGLISH;
};

/**
 * Core language detector function
 * const detectedLanguages = detectLanguage(['LanguageDetector.Cookie', 'LanguageDetector.LocalStorage'], { lookupCookie: 'myCookie' });
 */
export const getBrowserLocale = (
  userOptions: LanguageDetectorOptions | undefined = {}
): Locales => {
  const options = { ...getDefaultsOptions(), ...userOptions };

  const locales = detectLanguage(options.order ?? [], options);

  return getFirstAvailableLocale(locales, options.order ?? []);
};
