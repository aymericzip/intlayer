import { units } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

export const useUnit = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof units>) =>
    units(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? client.locale,
    });
};
