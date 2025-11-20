import configuration from '@intlayer/config/built';
import type { Locale, LocalesValues } from '@intlayer/types';
import { derived, type Readable, type Writable, writable } from 'svelte/store';

export interface IntlayerStoreType {
  locale: Locale;
}

const defaultLocale = configuration.internationalization
  ?.defaultLocale as Locale;

// Create the main intlayer store
const createIntlayerStore = () => {
  const { subscribe, set, update }: Writable<IntlayerStoreType> = writable({
    locale: defaultLocale, // Default locale
  });

  return {
    subscribe,
    setLocale: (locale: LocalesValues) =>
      update((store) => ({ ...store, locale: locale as Locale })),
    getLocale: (): Readable<Locale> =>
      derived({ subscribe }, ($store) => $store.locale),
    reset: () =>
      set({
        locale: defaultLocale,
      }),
  };
};

export const intlayerStore = createIntlayerStore();
