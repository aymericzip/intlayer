import type {
  SearchDocUtilParams,
  SearchDocUtilResult,
} from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getSearchAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig: IntlayerConfig
) => {
  const backendURL = intlayerConfig.editor.backendURL;

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
