import type {
  AddDictionaryBody,
  AddDictionaryResult,
  DeleteDictionaryParam,
  DeleteDictionaryResult,
  GetDictionariesParams,
  GetDictionariesResult,
  UpdateDictionaryBody,
  UpdateDictionaryResult,
  PushDictionariesBody,
  PushDictionariesResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from './fetcher';

const backendURL = getConfiguration().editor.backendURL;
const PROJECT_API_ROUTE = `${backendURL}/api/dictionary`;

export const getDictionaryAPI = (authAPIOptions: FetcherOptions = {}) => {
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
    dictionary: UpdateDictionaryBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateDictionaryResult>(
      `${PROJECT_API_ROUTE}`,
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
    pushDictionaries,
    addDictionary,
    updateDictionary,
    deleteDictionary,
  };
};

export const dictionaryAPI = getDictionaryAPI();
