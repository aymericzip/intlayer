import { percentage } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

export const usePercentage = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof percentage>) =>
    percentage(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? client.locale,
    });
};
