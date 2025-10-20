import type { LocalesValues } from '@intlayer/types';
import { derived, type Readable, type Writable, writable } from 'svelte/store';

export interface IntlayerStoreType {
  locale: LocalesValues;
}

// Create the main intlayer store
const createIntlayerStore = () => {
  const { subscribe, set, update }: Writable<IntlayerStoreType> = writable({
    locale: 'en' as LocalesValues, // Default locale
  });

  return {
    subscribe,
    setLocale: (locale: LocalesValues) =>
      update((store) => ({ ...store, locale })),
    getLocale: (): Readable<LocalesValues> =>
      derived({ subscribe }, ($store) => $store.locale),
    reset: () => set({ locale: 'en' as LocalesValues }),
  };
};

export const intlayerStore = createIntlayerStore();
