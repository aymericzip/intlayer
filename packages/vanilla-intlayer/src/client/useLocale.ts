import { internationalization } from '@intlayer/config/built';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getIntlayerClient } from './installIntlayer';
import { setLocaleInStorage } from './useLocaleStorage';

export type UseLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: DeclaredLocales) => void;
};

export type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
  subscribe: (callback: (locale: LocalesValues) => void) => () => void;
};

/**
 * Get the current locale state and locale management utilities.
 *
 * Returns a plain object with the current `locale`, `defaultLocale`,
 * `availableLocales`, a `setLocale` function, and a `subscribe` function
 * to react to locale changes.
 *
 * @param props - Optional configuration.
 * @returns Locale state and management utilities.
 *
 * @example
 * ```ts
 * import { installIntlayer, useLocale } from 'vanilla-intlayer';
 *
 * installIntlayer('en');
 *
 * const { locale, availableLocales, setLocale, subscribe } = useLocale();
 *
 * const unsubscribe = subscribe((newLocale) => {
 *   console.log('Locale changed to', newLocale);
 * });
 *
 * document.querySelector('#lang-switcher').addEventListener('change', (e) => {
 *   setLocale(e.target.value);
 * });
 * ```
 */
export const useLocale = (props: UseLocaleProps = {}): UseLocaleResult => {
  const client = getIntlayerClient();
  const { defaultLocale, locales: availableLocales } =
    internationalization ?? {};

  const setLocale = (newLocale: LocalesValues): void => {
    if (!(availableLocales ?? []).map(String).includes(newLocale)) {
      console.error(`Locale "${newLocale}" is not available.`);
      return;
    }

    client.setLocale(newLocale);

    setLocaleInStorage(
      newLocale,
      props.isCookieEnabled ?? client.isCookieEnabled ?? true
    );

    props.onLocaleChange?.(newLocale as DeclaredLocales);
  };

  return {
    locale: client.locale as DeclaredLocales,
    defaultLocale: defaultLocale as DeclaredLocales,
    availableLocales: (availableLocales ?? []) as DeclaredLocales[],
    setLocale,
    subscribe: (callback) => client.subscribe(callback),
  };
};
