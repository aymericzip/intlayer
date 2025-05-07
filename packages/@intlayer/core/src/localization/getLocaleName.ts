import type { LocalesValues } from '@intlayer/config/client';

const dnCache = new Map<LocalesValues, Intl.DisplayNames>();

export const getLocaleName = (
  displayLocale: LocalesValues,
  targetLocale: LocalesValues = displayLocale
): string => {
  if (typeof Intl?.DisplayNames !== 'function') {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `Intl.DisplayNames is not supported; falling back to raw locale (${displayLocale}). Consider adding a polyfill as https://formatjs.github.io/docs/polyfills/intl-displaynames/`
      );
    }
    return displayLocale;
  }

  // new Intl.DisplayNames() is fairly heavy: under the hood every call parses CLDR data and builds a resolver table. In your LocaleSwitcher it’s invoked:
  let dn = dnCache.get(targetLocale);
  if (!dn) {
    dn = new Intl.DisplayNames([targetLocale], { type: 'language' });
    dnCache.set(targetLocale, dn);
  }

  return dn.of(displayLocale) ?? 'Unknown locale';
};
