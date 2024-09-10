import type {
  AddDictionaryBody,
  AddDictionaryResult,
  DeleteDictionaryParam,
  DeleteDictionaryResult,
  GetDictionariesParams,
  GetDictionariesResult,
  UpdateDictionaryBody,
  UpdateDictionaryResult,
} from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/client';
import { fetcher } from './fetcher';

const backendURL = getConfiguration().editor.backendURL;
const PROJECT_API_ROUTE = `${backendURL}/api/dictionary`;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getDictionaries = async (filters?: GetDictionariesParams) =>
  await fetcher<GetDictionariesResult>(PROJECT_API_ROUTE, {
    params: filters,
  });

/**
 * Adds a new dictionary to the database.
 * @param dictionary - Dictionary data.
 */
const addDictionary = async (dictionary: AddDictionaryBody) =>
  await fetcher<AddDictionaryResult>(`${PROJECT_API_ROUTE}`, {
    method: 'POST',
    body: dictionary,
  });

/**
 * Updates an existing dictionary in the database.
 * @param dictionary - Updated dictionary data.
 */
const updateDictionary = async (dictionary: UpdateDictionaryBody) =>
  await fetcher<UpdateDictionaryResult>(`${PROJECT_API_ROUTE}`, {
    method: 'PUT',
    body: dictionary,
  });

/**
 * Deletes a dictionary from the database by its ID.
 * @param id - Dictionary ID.
 */
const deleteDictionary = async (id: DeleteDictionaryParam['dictionaryId']) =>
  await fetcher<DeleteDictionaryResult>(`${PROJECT_API_ROUTE}`, {
    method: 'DELETE',
    body: { id },
  });

export const dictionaryAPI = {
  getDictionaries,
  addDictionary,
  updateDictionary,
  deleteDictionary,
};
