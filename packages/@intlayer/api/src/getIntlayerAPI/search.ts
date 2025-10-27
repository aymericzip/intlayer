import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { type FetcherOptions, fetcher } from '../fetcher';
import type { SearchDocUtilParams, SearchDocUtilResult } from '../types';

export const getSearchAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

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
