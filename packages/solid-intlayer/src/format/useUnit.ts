import { units } from '@intlayer/core/formatters';
import { useIntlayerContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized unit formatter.
 */
export const useUnit = () => {
  const { locale } = useIntlayerContext();

  return (...args: Parameters<typeof units>) =>
    units(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale(),
    });
};
