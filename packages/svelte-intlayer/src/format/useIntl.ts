import { bindIntl, type WrappedIntl } from '@intlayer/core/formatters';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { derived } from 'svelte/store';
import { useLocale } from '../client/useLocale';

/**
 * Svelte store that provides a locale-bound `Intl` object.
 */
export const useIntl = (locale?: LocalesValues) => {
  const { locale: contextLocale } = useLocale();

  return derived<typeof contextLocale, WrappedIntl>(
    contextLocale,
    ($locale) => {
      const currentLocale = locale ?? $locale;

      return bindIntl(currentLocale);
    }
  );
};
