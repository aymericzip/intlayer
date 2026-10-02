import { number } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

/**
 * Remix hook that provides a localized number formatter bound to the request locale.
 */
export const useNumber = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof number>) =>
    number(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
