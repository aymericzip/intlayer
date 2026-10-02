import { percentage } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

export const usePercentage = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof percentage>) =>
    percentage(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
