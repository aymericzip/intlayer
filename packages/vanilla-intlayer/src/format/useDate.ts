import { date, presets } from '@intlayer/core/formatters';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * Vanilla JS hook that provides a localized date/time formatter.
 */
export const useDate = () => {
  const client = getIntlayerClient();

  return (...args: Parameters<typeof date>) => {
    const options =
      typeof args[1] === 'string'
        ? { ...presets[args[1]], locale: client.locale }
        : { ...args[1], locale: args[1]?.locale ?? client.locale };

    return date(args[0], options as Parameters<typeof date>[1]);
  };
};
