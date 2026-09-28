import { createIntlayerCMS } from '@intlayer/api';
import { dictionaryEndpoint } from '@intlayer/api/dictionary';
import type { IntlayerConfig } from '@intlayer/types/config';

export { fetchDistantDictionaries } from '../fetchDistantDictionaries';

/**
 * Creates the CMS dictionary client.
 *
 * Kept in its own module so `loadRemoteDictionaries` can import it lazily:
 * `@intlayer/api` is only loaded when remote credentials are configured.
 */
export const createRemoteDictionaryClient = (
  configuration: IntlayerConfig
): ReturnType<typeof dictionaryEndpoint> =>
  dictionaryEndpoint(createIntlayerCMS(configuration));
