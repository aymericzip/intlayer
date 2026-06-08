import { internationalization } from '@intlayer/config/built';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { derived, type Readable } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';
import { setLocaleInStorage } from './useLocaleStorage';

export type UseLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: DeclaredLocales) => void;
};

export type UseLocaleResult = {
  locale: Readable<DeclaredLocales>;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
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
}: UseLocaleProps = {}): UseLocaleResult => {
  const context = getIntlayerContext();
  const { defaultLocale, locales: availableLocales } =
    internationalization ?? {};

  if (context) {
    // Use context if available
    return {
      locale: derived(
        [intlayerStore],
        ([$store]) => (context.locale ?? $store.locale) as DeclaredLocales
      ),
      setLocale: (locale: LocalesValues) => {
        context.setLocale(locale);

        setLocaleInStorage(
          locale,
          isCookieEnabled ?? context?.isCookieEnabled ?? true
        );

        onLocaleChange?.(locale as DeclaredLocales);
      },
      defaultLocale,
      availableLocales,
    } as UseLocaleResult;
  }

  // Fallback to global store
  return {
    locale: intlayerStore.getLocale() as Readable<DeclaredLocales>,
    setLocale: (locale: LocalesValues) => {
      intlayerStore.setLocale(locale);

      setLocaleInStorage(locale, isCookieEnabled ?? true);

      onLocaleChange?.(locale as DeclaredLocales);
    },
    defaultLocale,
    availableLocales,
  } as UseLocaleResult;
};
