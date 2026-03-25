import { percentage } from '@intlayer/core/formatters';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized percentage formatter.
 */
export const usePercentage = () => {
  const { locale } = useContext(IntlayerClientContext);

  return (...args: Parameters<typeof percentage>) =>
    percentage(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale(),
    });
};
