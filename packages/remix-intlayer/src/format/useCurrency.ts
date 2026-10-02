import { currency } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

export const useCurrency = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof currency>) =>
    currency(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
