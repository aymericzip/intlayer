import configuration from '@intlayer/config/built';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
import { createEffect, useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
};

/**
 * Solid hook to manage the current locale and related functions.
 *
 * @param props - Optional configuration for locale management.
 * @returns An object containing the current locale (accessor), default locale, available locales, and a function to update the locale.
 *
 * @example
 * ```tsx
 * import { useLocale } from 'solid-intlayer';
 *
 * const LocaleSwitcher = () => {
 *   const { locale, setLocale, availableLocales } = useLocale();
 *
 *   return (
 *     <select value={locale()} onChange={(e) => setLocale(e.target.value)}>
 *       <For each={availableLocales}>
 *         {(loc) => <option value={loc}>{loc}</option>}
 *       </For>
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

  const context = useContext(IntlayerClientContext);

  const setLocale = (locale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(locale)) {
      console.error(`Locale ${locale} is not available`);
      return;
    }

    context?.setLocale(locale);

    setLocaleInStorage(
      locale,
      isCookieEnabled ?? context?.isCookieEnabled ?? true
    );

    onLocaleChange?.(locale);
  };

  // Create effect to trigger onLocaleChange when locale changes
  createEffect(() => {
    if (onLocaleChange && context?.locale) {
      const currentLocale = context.locale();
      onLocaleChange(currentLocale);
    }
  });

  return {
    locale: context?.locale, // Current locale (signal accessor)
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  } as unknown as UseLocaleResult;
};
