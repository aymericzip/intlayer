import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { derived, type Readable, readable, writable } from 'svelte/store';
import { intlayerStore } from 'svelte-intlayer';
import { configLocales } from './configuration';

/** A svelte-i18n `locale` store: writable, nullable. */
export type LocaleStore = Readable<string | null | undefined> & {
  set: (locale: string | null | undefined) => void;
  update: (
    updater: (locale: string | null | undefined) => string | null | undefined
  ) => void;
};

const currentLocale = derived(
  intlayerStore,
  ($store) => $store.locale as string
);

let currentLocaleValue: string | null | undefined;
currentLocale.subscribe((value) => {
  currentLocaleValue = value;
});

/**
 * `$locale` — backed by svelte-intlayer's store, so svelte-i18n call sites,
 * `useIntlayer` and `useLocale().setLocale` share one active locale.
 */
export const locale: LocaleStore = {
  subscribe: currentLocale.subscribe,
  set: (newLocale) => {
    // svelte-i18n allows clearing the locale; intlayer always has one.
    if (newLocale) intlayerStore.setLocale(newLocale as LocalesValues);
  },
  update: (updater) => {
    const newLocale = updater(currentLocaleValue);
    if (newLocale) intlayerStore.setLocale(newLocale as LocalesValues);
  },
};

/** `$locales` — the locales declared in the intlayer configuration. */
export const locales: Readable<string[]> = readable(configLocales);

/**
 * `$isLoading` — always `false`: intlayer dictionaries are part of the bundle
 * (or preloaded per locale), so there is no pending catalog to wait for.
 */
export const isLoading = writable(false);
