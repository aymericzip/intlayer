import { list } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/IntlayerClient';

export const useList = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof list>) =>
    list(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? client.locale,
    });
};
