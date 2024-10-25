import { logger } from '@logger';
import { DictionaryModel } from '@models/dictionary.model';
import type { DictionaryFilters } from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import {
  type DictionaryFields,
  validateDictionary,
} from '@utils/validation/validateDictionary';
import type { ObjectId } from 'mongoose';
import type { Dictionary, DictionaryData } from '@/types/dictionary.types';

/**
 * Finds dictionaries based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @returns List of dictionaries matching the filters.
 */
export const findDictionaries = async (
  filters: DictionaryFilters,
  skip = 0,
  limit = 100
): Promise<Dictionary[]> => {
  return await DictionaryModel.find(filters).skip(skip).limit(limit);
};

/**
 * Finds a dictionary by its ID.
 * @param dictionaryId - The ID of the dictionary to find.
 * @returns The dictionary matching the ID.
 */
export const getDictionaryById = async (
  dictionaryId: string | ObjectId
): Promise<Dictionary> => {
  const dictionary = await DictionaryModel.findById(dictionaryId);

  if (!dictionary) {
    const dictionaryIdString = String(dictionaryId);
    const errorMessage = `Dictionary not found - ${dictionaryIdString}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return dictionary;
};

/**
 * Finds a dictionary by its ID.
 * @param dictionaryKey - The ID of the dictionary to find.
 * @returns The dictionary matching the ID.
 */
export const getDictionaryByKey = async (
  dictionaryKey: string,
  projectId: string | ObjectId
): Promise<Dictionary> => {
  const dictionary = await DictionaryModel.findOne({
    key: dictionaryKey,
    projectIds: projectId,
  });

  if (!dictionary) {
    const errorMessage = `Dictionary not found - ${dictionaryKey}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return dictionary;
};

/**
 * Counts the total number of dictionaries that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of dictionaries.
 */
export const countDictionaries = async (
  filters: DictionaryFilters
): Promise<number> => {
  const result = await DictionaryModel.countDocuments(filters);

  if (typeof result === 'undefined') {
    const errorMessage = 'Dictionary count failed';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return result;
};

/**
 * Creates a new dictionary in the database.
 * @param  dictionary - The dictionary data to create.
 * @returns The created dictionary.
 */
export const createDictionary = async (
  dictionary: DictionaryData
): Promise<Dictionary> => {
  const errors = await validateDictionary(dictionary);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Dictionary invalid fields - ${JSON.stringify(errors)}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await DictionaryModel.create(dictionary);
};

type GetExistingDictionaryResult = {
  existingDictionariesKey: string[];
  newDictionariesKey: string[];
};

/**
 * Gets the existing dictionaries from the provided list of keys.
 * @param dictionariesKeys - List of dictionary keys to check.
 * @param projectId - The ID of the project to check the dictionaries against.
 * @returns The existing dictionaries and the new dictionaries.
 */
export const getExistingDictionaryKey = async (
  dictionariesKeys: string[],
  projectId: string | ObjectId
): Promise<GetExistingDictionaryResult> => {
  // Fetch dictionaries from the database where the key is in the provided list
  const existingDictionaries = await DictionaryModel.find({
    key: { $in: dictionariesKeys },
    projectIds: projectId,
  });

  // Map existing dictionaries to a LocalDictionary object
  const existingDictionariesKey: string[] = [];
  const newDictionariesKey: string[] = [];

  for (const key of dictionariesKeys) {
    const isDictionaryExist = existingDictionaries.some(
      (dictionary) => dictionary.key === key
    );

    if (isDictionaryExist) {
      existingDictionariesKey.push(key);
    } else {
      newDictionariesKey.push(key);
    }
  }

  return { existingDictionariesKey, newDictionariesKey };
};

/**
 * Updates an existing dictionary in the database by its ID.
 * @param dictionaryId - The ID of the dictionary to update.
 * @param dictionary - The updated dictionary data.
 * @returns The updated dictionary.
 */
export const updateDictionaryById = async (
  dictionaryId: string | ObjectId,
  dictionary: Partial<Dictionary>
): Promise<Dictionary> => {
  const updatedKeys = Object.keys(dictionary) as DictionaryFields;
  const errors = validateDictionary(dictionary, updatedKeys);
  const dictionaryIdString = String(dictionaryId);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Dictionary invalid fields - ${dictionaryIdString} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await DictionaryModel.updateOne(
    { _id: dictionaryId },
    dictionary
  );

  if (result.matchedCount === 0) {
    const errorMessage = `Dictionary update failed - ${dictionaryIdString}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await getDictionaryById(dictionaryId);
};

/**
 * Updates an existing dictionary in the database by its key.
 * @param dictionaryKey - The ID of the dictionary to update.
 * @param dictionary - The updated dictionary data.
 * @returns The updated dictionary.
 */
export const updateDictionaryByKey = async (
  dictionaryKey: string,
  dictionary: Partial<Dictionary>,
  projectId: string | ObjectId
): Promise<Dictionary> => {
  const updatedKeys = Object.keys(dictionary) as DictionaryFields;
  const errors = validateDictionary(dictionary, updatedKeys);

  if (Object.keys(errors).length > 0) {
    const errorMessage = `Dictionary invalid fields - ${dictionaryKey} - ${JSON.stringify(
      errors
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await DictionaryModel.updateOne(
    { key: dictionaryKey, projectIds: projectId },
    dictionary
  );

  if (result.matchedCount === 0) {
    const errorMessage = `Dictionary update failed - ${dictionaryKey}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await getDictionaryByKey(dictionaryKey, projectId);
};

/**
 * Deletes a dictionary from the database by its ID.
 * @param dictionaryId - The ID of the dictionary to delete.
 * @returns The result of the deletion operation.
 */
export const deleteDictionaryById = async (
  dictionaryId: string
): Promise<Dictionary> => {
  const dictionary = await DictionaryModel.findByIdAndDelete(dictionaryId);

  if (!dictionary) {
    const dictionaryIdString = String(dictionaryId);
    const errorMessage = `Dictionary not found - ${dictionaryIdString}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return dictionary;
};
