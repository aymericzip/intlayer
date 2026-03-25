import { number } from '@intlayer/core/formatters';
import { derived } from 'svelte/store';
import { useLocale } from '../client/useLocale';

/**
 * Svelte store that provides a localized number formatter.
 *
 * @returns {import('svelte/store').Readable<(...args: Parameters<typeof number>) => string>}
 * A store containing a number formatting function bound to the active locale.
 */
export const useNumber = () => {
  const { locale } = useLocale();

  return derived(
    locale,
    ($locale) =>
      (...args: Parameters<typeof number>) =>
        number(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? $locale,
        })
  );
};
