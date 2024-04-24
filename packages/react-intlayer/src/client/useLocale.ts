import type { Locales } from '@intlayer/config/client';
import { useLocaleBase } from './useLocaleBase';
import { useLocaleCookie } from './useLocaleCookie';

export const useLocale = () => {
  const { setLocaleCookie } = useLocaleCookie();
  const reactLocaleHook = useLocaleBase();

  const { availableLocales, locale: currentLocale } = reactLocaleHook;

  const setLocale = (locale: Locales) => {
    if (currentLocale.toString() === locale.toString()) return;

    if (!availableLocales.includes(locale)) {
      console.error(`Locale ${locale} is not available`);
      return;
    }

    setLocaleCookie(locale);
  };

  return {
    ...reactLocaleHook,
    setLocale,
  };
};
