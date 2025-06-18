import type { LocalesValues } from '@intlayer/config/client';
import {
  type DictionaryKeys,
  getIntlayer,
  getIntlayerAsync,
} from '@intlayer/core';
import { createMemo, createSignal, onMount, useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * SolidJS composable that picks one dictionary by its key and returns the content.
 *
 * 1. Uses the local (bundled) dictionary for the initial render.
 * 2. Hydrates with the distant dictionary once it resolves.
 *
 * If `locale` is not provided, it falls back to the locale found in the
 * `IntlayerClientContext`.
 */
export const useIntlayerAsync = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale();

  // Local (eager) dictionary
  const localeDictionary = getIntlayer(key, localeTarget);

  // Reactive state
  const [distantDictionary, setDistantDictionary] = createSignal<
    typeof localeDictionary | null
  >(null);
  const [isLoading, setIsLoading] = createSignal(false);

  // Fetch the remote dictionary after mount
  onMount(() => {
    setIsLoading(true);
    getIntlayerAsync(key)
      .then((dict) => dict && setDistantDictionary(dict))
      .finally(() => setIsLoading(false));
  });

  // Choose distant dictionary when it exists
  const dictionary = createMemo(() => distantDictionary() ?? localeDictionary);

  /*
   * Spread the current dictionary value so callers can destructure
   * keys just like in other framework versions, and add the reactive
   * `isLoading` flag.
   */
  return {
    ...dictionary(),
    isLoading: isLoading(),
  } as typeof localeDictionary & { isLoading: boolean };
};
