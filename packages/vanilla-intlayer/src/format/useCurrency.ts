import { currency } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

export const useCurrency = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof currency>) =>
    currency(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? client.locale,
    });
};
