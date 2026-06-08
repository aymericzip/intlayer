import { relativeTime } from '@intlayer/core/formatters';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized relative time formatter.
 */
export const useRelativeTime = () => {
  const { locale } = useContext(IntlayerClientContext) ?? {};

  return (...args: Parameters<typeof relativeTime>) =>
    relativeTime(args[0], args[1], {
      ...args[2],
      locale: args[2]?.locale ?? locale(),
    });
};
