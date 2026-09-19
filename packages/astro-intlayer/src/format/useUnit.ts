import { internationalization } from '@intlayer/config/built';
import { units } from '@intlayer/core/formatters';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { getRequestLocale } from '../requestStorage';

const { defaultLocale } = internationalization;

export const useUnit = () => {
  const locale = getRequestLocale() ?? (defaultLocale as DeclaredLocales);

  return (...args: Parameters<typeof units>) =>
    units(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
