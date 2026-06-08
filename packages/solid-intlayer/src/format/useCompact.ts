import { compact } from '@intlayer/core/formatters';
import { useIntlayerContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized compact number formatter.
 */
export const useCompact = () => {
  const { locale } = useIntlayerContext();

  return (...args: Parameters<typeof compact>) =>
    compact(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale(),
    });
};
