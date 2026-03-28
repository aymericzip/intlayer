import { number } from '@intlayer/core/formatters';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized number formatter.
 *
 * @returns {(value: string | number, options?: import("@intlayer/core/formatters").NumberProps) => string}
 * A function to format numbers into localized strings.
 */
export const useNumber = () => {
  const { locale } = useContext(IntlayerClientContext) ?? {};

  return (...args: Parameters<typeof number>) =>
    number(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale(),
    });
};
