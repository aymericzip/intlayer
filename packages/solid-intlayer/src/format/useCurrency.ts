import { currency } from '@intlayer/core/formatters';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized currency formatter.
 */
export const useCurrency = () => {
  const { locale } = useContext(IntlayerClientContext);

  return (...args: Parameters<typeof currency>) =>
    currency(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale(),
    });
};
