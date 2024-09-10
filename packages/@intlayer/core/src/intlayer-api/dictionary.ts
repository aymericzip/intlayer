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

const backendURL = getConfiguration().editor.backendURL;
const PROJECT_API_ROUTE = `${backendURL}/api/dictionary`;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getDictionaries = async (
  filters?: GetDictionariesParams
): Promise<GetDictionariesResult> => {
  const params = new URLSearchParams(filters as URLSearchParams);

  const response = await fetch(`${PROJECT_API_ROUTE}?${params.toString()}`, {
    method: 'GET',
  });
  return response.json();
};

/**
 * Adds a new dictionary to the database.
 * @param dictionary - Dictionary data.
 */
const addDictionary = async (
  dictionary: AddDictionaryBody
): Promise<AddDictionaryResult> => {
  const response = await fetch(`${PROJECT_API_ROUTE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dictionary),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Updates an existing dictionary in the database.
 * @param dictionary - Updated dictionary data.
 */
const updateDictionary = async (
  dictionary: UpdateDictionaryBody
): Promise<UpdateDictionaryResult> => {
  const response = await fetch(`${PROJECT_API_ROUTE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dictionary),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Deletes a dictionary from the database by its ID.
 * @param id - Dictionary ID.
 */
const deleteDictionary = async (
  id: DeleteDictionaryParam['dictionaryId']
): Promise<DeleteDictionaryResult> => {
  const response = await fetch(`${PROJECT_API_ROUTE}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });
  return response.json();
};

export const dictionaryAPI = {
  getDictionaries,
  addDictionary,
  updateDictionary,
  deleteDictionary,
};
