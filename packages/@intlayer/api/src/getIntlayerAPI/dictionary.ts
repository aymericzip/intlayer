import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import type {
  AddDictionaryBody,
  AddDictionaryResult,
  DeleteDictionaryParam,
  DeleteDictionaryResult,
  GetDictionariesKeysResult,
  GetDictionariesParams,
  GetDictionariesResult,
  GetDictionaryParams,
  GetDictionaryQuery,
  GetDictionaryResult,
  PushDictionariesBody,
  PushDictionariesResult,
  UpdateDictionaryBody,
  UpdateDictionaryResult,
} from '../types';

import { fetcher, type FetcherOptions } from '../fetcher';

export const getDictionaryAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const PROJECT_API_ROUTE = `${backendURL}/api/dictionary`;

  /**
   * Retrieves a list of dictionaries based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getDictionaries = async (
    filters?: GetDictionariesParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetDictionariesResult>(
      PROJECT_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        params: filters,
      }
    );

  /**
   * Retrieves a list of dictionary keys related to the project.
   */
  const getDictionariesKeys = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetDictionariesKeysResult>(
      `${PROJECT_API_ROUTE}/keys`,
      authAPIOptions,
      otherOptions
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
      `${PROJECT_API_ROUTE}/${dictionaryKey}`,
      authAPIOptions,
      otherOptions,
      {
        params: version ? { version: version.toString() } : undefined,
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
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  const pushDictionaries = async (
    dictionaries: PushDictionariesBody['dictionaries'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<PushDictionariesResult>(
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PATCH',
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
      `${PROJECT_API_ROUTE}/${dictionary.id}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
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
      `${PROJECT_API_ROUTE}/${id}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
      }
    );

  return {
    getDictionaries,
    getDictionariesKeys,
    getDictionary,
    pushDictionaries,
    addDictionary,
    updateDictionary,
    deleteDictionary,
  };
};
