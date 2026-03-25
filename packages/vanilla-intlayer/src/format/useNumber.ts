import { number } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * Vanilla JS hook that provides a localized number formatter.
 */
export const useNumber = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof number>) =>
    number(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? client.locale,
    });
};
