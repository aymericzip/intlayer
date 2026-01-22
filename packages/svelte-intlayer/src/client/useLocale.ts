import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { derived } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * Svelte hook to manage the current locale and related functions.
 *
 * @param props - Optional configuration for locale management.
 * @returns An object containing the current locale (readable store), default locale, available locales, and a function to update the locale.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useLocale } from 'svelte-intlayer';
 *   const { locale, setLocale, availableLocales } = useLocale();
 * </script>
 *
 * <select value={$locale} on:change={(e) => setLocale(e.target.value)}>
 *   {#each availableLocales as loc}
 *     <option value={loc}>{loc}</option>
 *   {/each}
 * </select>
 * ```
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}) => {
  const context = getIntlayerContext();
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  if (context) {
    // Use context if available
    return {
      locale: derived(
        [intlayerStore],
        ([$store]) => context.locale ?? $store.locale
      ),
      setLocale: (locale: LocalesValues) => {
        context.setLocale(locale);

        setLocaleInStorage(
          locale,
          isCookieEnabled ?? context?.isCookieEnabled ?? true
        );

        onLocaleChange?.(locale);
      },
      defaultLocale,
      availableLocales,
    };
  }

  // Fallback to global store
  return {
    locale: intlayerStore.getLocale(),
    setLocale: (locale: LocalesValues) => {
      intlayerStore.setLocale(locale);

      setLocaleInStorage(locale, isCookieEnabled ?? true);

      onLocaleChange?.(locale);
    },
    defaultLocale,
    availableLocales,
  };
};
