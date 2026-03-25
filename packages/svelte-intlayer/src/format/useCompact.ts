import { compact } from '@intlayer/core/formatters';
import { derived } from 'svelte/store';
import { useLocale } from '../client/useLocale';

export const useCompact = () => {
  const { locale } = useLocale();

  return derived(
    locale,
    ($locale) =>
      (...args: Parameters<typeof compact>) =>
        compact(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? $locale,
        })
  );
};
