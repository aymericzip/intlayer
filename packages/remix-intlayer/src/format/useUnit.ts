import { units } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

export const useUnit = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof units>) =>
    units(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
