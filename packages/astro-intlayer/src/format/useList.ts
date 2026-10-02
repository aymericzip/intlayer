import { list } from '@intlayer/core/formatters';
import { getRequestLocale } from '../requestStorage';

export const useList = () => {
  const locale = getRequestLocale();

  return (...args: Parameters<typeof list>) =>
    list(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
