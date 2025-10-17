import type { Dictionary, LocalesValues } from '@intlayer/types';
import { getDictionary } from '../getDictionary';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
) => {
  const localeTarget =
    locale ?? getServerContext<LocalesValues>(IntlayerServerContext);

  return getDictionary<T, LocalesValues>(dictionary, localeTarget);
};
