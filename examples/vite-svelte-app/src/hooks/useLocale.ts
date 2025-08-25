import { writable } from 'svelte/store';

export function useLocale() {
  const locale = writable('en'); // default locale

  function setLocale(newLocale: string) {
    locale.set(newLocale);
  }

  return { locale, setLocale };
}
