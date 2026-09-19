import { internationalization } from '@intlayer/config/built';
import { relativeTime } from '@intlayer/core/formatters';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { getRequestLocale } from '../requestStorage';

const { defaultLocale } = internationalization;

export const useRelativeTime = () => {
  const locale = getRequestLocale() ?? (defaultLocale as DeclaredLocales);

  return (...args: Parameters<typeof relativeTime>) =>
    relativeTime(args[0], args[1], {
      ...args[2],
      locale: args[2]?.locale ?? locale,
    });
};
