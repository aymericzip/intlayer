import configuration from '@intlayer/config/built';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
import { type ComputedRef, computed, inject } from 'vue';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

type UseLocaleResult = {
  locale: ComputedRef<DeclaredLocales>;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
};

/**
 * Vue composable to get the current locale and related locale management functions.
 *
 * @param props - Optional properties for the composable.
 * @returns An object containing the current locale (reactive), default locale, available locales, and a function to update the locale.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useLocale } from 'vue-intlayer';
 *
 * const { locale, setLocale, availableLocales } = useLocale();
 * </script>
 *
 * <template>
 *   <select :value="locale" @change="(e) => setLocale(e.target.value)">
 *     <option v-for="loc in availableLocales" :key="loc" :value="loc">
 *       {{ loc }}
 *     </option>
 *   </select>
 * </template>
 * ```
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}): UseLocaleResult => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  // Create a reactive reference for the locale
  const locale = computed(
    () => (intlayer?.locale?.value ?? defaultLocale) as DeclaredLocales
  );

  const setLocale = (newLocale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    if (intlayer) {
      intlayer.setLocale(newLocale);
    }

    setLocaleInStorage(
      newLocale,
      isCookieEnabled ?? intlayer?.isCookieEnabled ?? true
    );

    onLocaleChange?.(newLocale);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
