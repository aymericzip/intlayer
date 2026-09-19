import { internationalization } from '@intlayer/config/built';
import { number } from '@intlayer/core/formatters';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { getRequestLocale } from '../requestStorage';

const { defaultLocale } = internationalization;

/**
 * Remix hook that provides a localized number formatter bound to the request locale.
 */
export const useNumber = () => {
  const locale = getRequestLocale() ?? (defaultLocale as DeclaredLocales);

  return (...args: Parameters<typeof number>) =>
    number(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
