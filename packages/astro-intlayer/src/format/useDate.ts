import { internationalization } from '@intlayer/config/built';
import { date, presets } from '@intlayer/core/formatters';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { getRequestLocale } from '../requestStorage';

const { defaultLocale } = internationalization;

/**
 * Astro hook that provides a localized date/time formatter bound to the request locale.
 */
export const useDate = () => {
  const locale = getRequestLocale() ?? (defaultLocale as DeclaredLocales);

  return (...args: Parameters<typeof date>) => {
    const options =
      typeof args[1] === 'string'
        ? { ...presets[args[1]], locale }
        : { ...args[1], locale: args[1]?.locale ?? locale };

    return date(args[0], options as Parameters<typeof date>[1]);
  };
};
