import { computed, inject, type Signal } from '@angular/core';
import { internationalization } from '@intlayer/config/built';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';
import { setLocaleInStorage } from './useLocaleStorage';

export type UseLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: DeclaredLocales) => void;
};

export type UseLocaleResult = {
  locale: Signal<DeclaredLocales>;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
};

/**
 * Angular hook to manage the current locale and related functions.
 *
 * @param props - Optional configuration for locale management.
 * @returns An object containing the current locale (signal), default locale, available locales, and a function to update the locale.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 * import { useLocale } from 'angular-intlayer';
 *
 * @Component({
 *   standalone: true,
 *   selector: 'app-locale-switcher',
 *   template: `
 *     <select [value]="locale()" (change)="setLocale($any($event.target).value)">
 *       @for (loc of availableLocales; track loc) {
 *         <option [value]="loc">{{ loc }}</option>
 *       }
 *     </select>
 *   `,
 * })
 * export class LocaleSwitcher {
 *   const { locale, setLocale, availableLocales } = useLocale();
 * }
 * ```
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: UseLocaleProps = {}): UseLocaleResult => {
  const { defaultLocale, locales: availableLocales } =
    internationalization ?? {};
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  // Create a reactive reference for the locale
  const locale = computed(
    () => (intlayer?.locale() ?? defaultLocale) as DeclaredLocales
  );
  const isCookieEnabledContext = computed(
    () => intlayer?.isCookieEnabled() ?? true
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
      isCookieEnabled ?? isCookieEnabledContext() ?? true
    );
    onLocaleChange?.(newLocale as DeclaredLocales);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  } as UseLocaleResult;
};
