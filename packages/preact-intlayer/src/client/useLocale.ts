'use client';

import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { useContext } from 'preact/hooks';
import { IntlayerClientContext } from './IntlayerProvider';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * Preact hook to get the current locale and related locale management functions.
 *
 * @param props - Optional properties for the hook.
 * @returns An object containing the current locale, default locale, available locales, and a function to update the locale.
 *
 * @example
 * ```tsx
 * import { useLocale } from 'preact-intlayer';
 *
 * const LocaleSwitcher = () => {
 *   const { locale, setLocale, availableLocales } = useLocale();
 *
 *   return (
 *     <select value={locale} onChange={(e) => setLocale(e.target.value)}>
 *       {availableLocales.map((loc) => (
 *         <option key={loc} value={loc}>{loc}</option>
 *       ))}
 *     </select>
 *   );
 * };
 * ```
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}) => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  const {
    locale,
    setLocale: setLocaleState,
    isCookieEnabled: isCookieEnabledContext,
  } = useContext(IntlayerClientContext);

  const setLocale = (locale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(locale)) {
      console.error(`Locale ${locale} is not available`);
      return;
    }

    setLocaleState(locale);

    setLocaleInStorage(
      locale,
      isCookieEnabled ?? isCookieEnabledContext ?? true
    );

    onLocaleChange?.(locale);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
