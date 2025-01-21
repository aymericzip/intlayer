import type {
  // @ts-ignore: @intlayer/backend is not built yet
  AddDictionaryBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AddDictionaryResult,
  // @ts-ignore: @intlayer/backend is not built yet
  DeleteDictionaryParam,
  // @ts-ignore: @intlayer/backend is not built yet
  DeleteDictionaryResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetDictionariesParams,
  // @ts-ignore: @intlayer/backend is not built yet
  GetDictionariesResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateDictionaryParam,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateDictionaryBody,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateDictionaryResult,
  // @ts-ignore: @intlayer/backend is not built yet
  PushDictionariesBody,
  // @ts-ignore: @intlayer/backend is not built yet
  PushDictionariesResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetDictionaryParams,
  // @ts-ignore: @intlayer/backend is not built yet
  GetDictionaryQuery,
  // @ts-ignore: @intlayer/backend is not built yet
  GetDictionaryResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetDictionariesKeysResult,
  // @ts-ignore @intlayer/backend is not build yet
} from '@intlayer/backend';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from '../fetcher';

export const getDictionaryAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const { backendURL } = (intlayerConfig ?? getConfiguration()).editor;
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
    dictionary: AddDictionaryBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddDictionaryResult>(
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: dictionary,
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
    dictionaryId: UpdateDictionaryParam['dictionaryId'],
    dictionary: UpdateDictionaryBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateDictionaryResult>(
      `${PROJECT_API_ROUTE}/${dictionaryId}`,
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
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
        body: { id },
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

export const dictionaryAPI = getDictionaryAPI();
