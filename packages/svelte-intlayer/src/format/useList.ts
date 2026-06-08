import { list } from '@intlayer/core/formatters';
import { derived } from 'svelte/store';
import { useLocale } from '../client/useLocale';

export const useList = () => {
  const { locale } = useLocale();

  return derived(
    locale,
    ($locale) =>
      (...args: Parameters<typeof list>) =>
        list(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? $locale,
        })
  );
};
