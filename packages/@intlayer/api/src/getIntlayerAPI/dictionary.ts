import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  AddDictionaryBody,
  AddDictionaryResult,
  DeleteDictionaryParam,
  DeleteDictionaryResult,
  DictionaryRoutes,
  dictionaryContract,
  GetDictionariesByKeysResult,
  GetDictionariesKeysResult,
  GetDictionariesParams,
  GetDictionariesResult,
  GetDictionariesUpdateTimestampResult,
  GetDictionaryParams,
  GetDictionaryQuery,
  GetDictionaryResult,
  PushDictionariesBody,
  PushDictionariesResult,
  UpdateDictionaryBody,
  UpdateDictionaryResult,
} from '@intlayer/backend-contract/dictionary';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const dictionaryGroup = {
  prefix: '/api/dictionary',
} as const satisfies Pick<typeof dictionaryContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const dictionaryEndpoints = {
  getDictionaries: { method: 'GET', path: '/' },
  getDictionariesKeys: { method: 'GET', path: '/keys' },
  getDictionariesUpdateTimestamp: { method: 'GET', path: '/update' },
  getDictionariesByKeys: { method: 'GET', path: '/by-keys' },
  getDictionary: { method: 'GET', path: '/:dictionaryKey' },
  addDictionary: { method: 'POST', path: '/' },
  pushDictionaries: { method: 'PATCH', path: '/' },
  updateDictionary: { method: 'PUT', path: '/:dictionaryId' },
  deleteDictionary: { method: 'DELETE', path: '/:dictionaryId' },
} as const satisfies RouteEndpoints<DictionaryRoutes>;

export const getDictionaryAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Retrieves a list of dictionaries based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getDictionaries = async (
    filters?: GetDictionariesParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetDictionariesResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.getDictionaries
      ),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params: filters,
      }
    );

  /**
   * Retrieves a list of dictionary keys related to the project.
   */
  const getDictionariesKeys = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetDictionariesKeysResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.getDictionariesKeys
      ),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  /**
   * Retrieves a list of dictionary keys related to the project.
   */
  const getDictionariesUpdateTimestamp = async (
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetDictionariesUpdateTimestampResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.getDictionariesUpdateTimestamp
      ),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  /**
   * Retrieves a dictionary by its key and version.
   * @param dictionaryKey - Dictionary key.
   * @param version - Dictionary version of content.
   */
  const getDictionary = async (
    dictionaryKey: GetDictionaryParams['dictionaryKey'],
    version?: GetDictionaryQuery['version'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetDictionaryResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.getDictionary,
        { dictionaryKey }
      ),
      authAPIOptions,
      otherOptions,
      {
        params: version ? { version: version.toString() } : undefined,
      }
    );

  /**
   * Retrieves several dictionaries at once from their keys, in a single
   * request. Keys matching no dictionary are absent from the result, so the
   * caller should reconcile the response against the requested keys.
   *
   * @param dictionaryKeys - Dictionary keys to retrieve.
   * @param version - Dictionary version of content.
   */
  const getDictionariesByKeys = async (
    dictionaryKeys: string[],
    version?: GetDictionaryQuery['version'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetDictionariesByKeysResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.getDictionariesByKeys
      ),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        params: {
          keys: dictionaryKeys.join(','),
          version: version?.toString(),
        },
      }
    );

  /**
   * Adds a new dictionary to the database.
   * @param dictionary - Dictionary data.
   */
  const addDictionary = async (
    body: AddDictionaryBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddDictionaryResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.addDictionary
      ),
      authAPIOptions,
      otherOptions,
      {
        method: dictionaryEndpoints.addDictionary.method,
        body,
      }
    );

  const pushDictionaries = async (
    dictionaries: PushDictionariesBody['dictionaries'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<PushDictionariesResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.pushDictionaries
      ),
      authAPIOptions,
      otherOptions,
      {
        method: dictionaryEndpoints.pushDictionaries.method,
        body: { dictionaries },
      }
    );

  /**
   * Updates an existing dictionary in the database.
   * @param dictionary - Updated dictionary data.
   */
  const updateDictionary = async (
    dictionary: UpdateDictionaryBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateDictionaryResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.updateDictionary,
        { dictionaryId: String(dictionary.id) }
      ),
      authAPIOptions,
      otherOptions,
      {
        method: dictionaryEndpoints.updateDictionary.method,
        body: dictionary,
      }
    );

  /**
   * Deletes a dictionary from the database by its ID.
   * @param id - Dictionary ID.
   */
  const deleteDictionary = async (
    id: DeleteDictionaryParam['dictionaryId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteDictionaryResult>(
      buildRouteURL(
        backendURL,
        dictionaryGroup,
        dictionaryEndpoints.deleteDictionary,
        { dictionaryId: String(id) }
      ),
      authAPIOptions,
      otherOptions,
      {
        method: dictionaryEndpoints.deleteDictionary.method,
      }
    );

  return {
    getDictionaries,
    getDictionariesKeys,
    getDictionariesUpdateTimestamp,
    getDictionary,
    getDictionariesByKeys,
    pushDictionaries,
    addDictionary,
    updateDictionary,
    deleteDictionary,
  };
};

/**
 * Authenticated `dictionary` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const dictionaryEndpoint = createEndpoint(getDictionaryAPI);
