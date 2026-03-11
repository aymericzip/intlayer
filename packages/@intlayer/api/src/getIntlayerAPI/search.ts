import type {
  SearchDocUtilParams,
  SearchDocUtilResult,
} from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getSearchAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  let backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    backendURL = DefaultValues.Editor.BACKEND_URL;
    console.dir({ intlayerConfig, configuration }, { depth: null });
    console.error('Backend URL is not defined in the Intlayer configuration.');
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
