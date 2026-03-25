import { relativeTime } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

export const useRelativeTime = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof relativeTime>) =>
    relativeTime(args[0], args[1], {
      ...args[2],
      locale: args[2]?.locale ?? client.locale,
    });
};
