import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  SearchDocUtilParams,
  SearchDocUtilResult,
  SearchRoutes,
  searchContract,
} from '@intlayer/backend-contract/search';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const searchGroup = {
  prefix: '/api/search',
} as const satisfies Pick<typeof searchContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const searchEndpoints = {
  doc: { method: 'GET', path: '/doc' },
} as const satisfies RouteEndpoints<SearchRoutes>;

export const getSearchAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

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
      buildRouteURL(backendURL, searchGroup, searchEndpoints.doc),
      authAPIOptions,
      otherOptions,
      {
        method: searchEndpoints.doc.method,
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
