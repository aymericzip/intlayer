import { date, presets } from '@intlayer/core/formatters';
import { derived } from 'svelte/store';
import { useLocale } from '../client/useLocale';

/**
 * Svelte store that provides a localized date/time formatter.
 *
 * @returns {import('svelte/store').Readable<(...args: Parameters<typeof date>) => string>}
 * A store containing a date/time formatting function bound to the active locale.
 */
export const useDate = () => {
  const { locale } = useLocale();

  return derived(locale, ($locale) => (...args: Parameters<typeof date>) => {
    const options =
      typeof args[1] === 'string'
        ? { ...presets[args[1]], locale: $locale }
        : { ...args[1], locale: args[1]?.locale ?? $locale };

    return date(args[0], options as Parameters<typeof date>[1]);
  });
};
