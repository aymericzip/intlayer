import { relativeTime } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

export const useRelativeTime = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof relativeTime>) =>
    relativeTime(args[0], args[1], {
      ...args[2],
      locale: args[2]?.locale ?? locale,
    });
};
