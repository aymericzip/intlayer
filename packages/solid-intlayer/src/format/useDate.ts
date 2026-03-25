import { date, presets } from '@intlayer/core/formatters';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from '../client/IntlayerProvider';

/**
 * Solid client hook that provides a localized date/time formatter.
 *
 * @returns {(date: Date | string | number, options?: DateProps) => string}
 * A function to format dates into localized strings.
 */
export const useDate = () => {
  const { locale } = useContext(IntlayerClientContext);

  return (...args: Parameters<typeof date>) => {
    const options =
      typeof args[1] === 'string'
        ? { ...presets[args[1]], locale: locale() }
        : { ...args[1], locale: args[1]?.locale ?? locale() };

    return date(args[0], options as Parameters<typeof date>[1]);
  };
};
