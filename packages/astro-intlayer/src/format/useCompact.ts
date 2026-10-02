import { compact } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

export const useCompact = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof compact>) =>
    compact(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
