import type {
  SearchDocUtilParams,
  SearchDocUtilResult,
} from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getSearchAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;

  const AI_API_ROUTE = `${backendURL}/api/search`;

  /**
   * Search documentation
   * @param params - Search parameters containing the input query.
   * @returns Search results with GitHub URLs.
   */
  const searchDoc = async (
    params?: SearchDocUtilParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SearchDocUtilResult>(
      `${AI_API_ROUTE}/doc`,
      authAPIOptions,
      otherOptions,
      {
        method: 'GET',
        params: params,
      }
    );

  return {
    searchDoc,
  };
};

/**
 * Authenticated `search` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const searchEndpoint = createEndpoint(getSearchAPI);
