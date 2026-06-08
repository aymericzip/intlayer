import { compact } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

export const useCompact = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof compact>) =>
    compact(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? client.locale,
    });
};
