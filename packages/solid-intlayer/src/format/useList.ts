import { list } from '@intlayer/core/formatters';
import { useIntlayerContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized list formatter.
 */
export const useList = () => {
  const { locale } = useIntlayerContext();

  return (...args: Parameters<typeof list>) =>
    list(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale(),
    });
};
