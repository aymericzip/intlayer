import { relativeTime } from '@intlayer/core/formatters';
import { derived } from 'svelte/store';
import { useLocale } from '../client/useLocale';

export const useRelativeTime = () => {
  const { locale } = useLocale();

  return derived(
    locale,
    ($locale) =>
      (...args: Parameters<typeof relativeTime>) =>
        relativeTime(args[0], args[1], {
          ...args[2],
          locale: args[2]?.locale ?? $locale,
        })
  );
};
