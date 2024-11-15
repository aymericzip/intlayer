import { DictionaryModel } from '@models/dictionary.model';
import { GenericError } from '@utils/errors';
import type { DictionaryFilters } from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import {
  type DictionaryFields,
  validateDictionary,
} from '@utils/validation/validateDictionary';
import type { ObjectId } from 'mongoose';
import type {
  Dictionary,
  DictionaryData,
  DictionaryDocument,
} from '@/types/dictionary.types';

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
): Promise<DictionaryDocument[]> =>
  await DictionaryModel.find(filters).skip(skip).limit(limit);

/**
 * Finds a dictionary by its ID.
 * @param dictionaryId - The ID of the dictionary to find.
 * @returns The dictionary matching the ID.
 */
export const getDictionaryById = async (
  dictionaryId: string | ObjectId
): Promise<DictionaryDocument> => {
  const dictionary = await DictionaryModel.findById(dictionaryId);

  if (!dictionary) {
    throw new GenericError('DICTIONARY_NOT_FOUND', { dictionaryId });
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
): Promise<DictionaryDocument> => {
  const dictionary = await DictionaryModel.findOne({
    key: dictionaryKey,
    projectIds: projectId,
  });

  if (!dictionary) {
    throw new GenericError('DICTIONARY_NOT_FOUND', {
      dictionaryKey,
      projectId,
    });
  }

  return dictionary;
};

export const getDictionariesByKeys = async (
  dictionaryKey: string[],
  projectId: string | ObjectId
): Promise<DictionaryDocument[]> => {
  const dictionaries = await DictionaryModel.find({
    key: dictionaryKey,
    projectIds: projectId,
  });

  return dictionaries;
};

export const getDictionariesKeys = async (
  projectId: string | ObjectId
): Promise<string[]> => {
  const dictionaries = await DictionaryModel.find({
    projectIds: projectId,
  }).select('key');

  return dictionaries.map((dictionary) => dictionary.key);
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
    throw new GenericError('DICTIONARY_COUNT_FAILED', { filters });
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
): Promise<DictionaryDocument> => {
  const errors = await validateDictionary(dictionary);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('DICTIONARY_INVALID_FIELDS', {
      errors,
    });
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
): Promise<DictionaryDocument> => {
  const updatedKeys = Object.keys(dictionary) as DictionaryFields;
  const errors = validateDictionary(dictionary, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('DICTIONARY_INVALID_FIELDS', {
      dictionaryId,
      errors,
    });
  }

  const existingDictionary = await getDictionaryById(dictionaryId);

  const result = await DictionaryModel.updateOne(
    { _id: dictionaryId },
    { ...dictionary, content: [existingDictionary.content, dictionary.content] }
  );

  if (result.matchedCount === 0) {
    throw new GenericError('DICTIONARY_UPDATE_FAILED', { dictionaryId });
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
): Promise<DictionaryDocument> => {
  const updatedKeys = Object.keys(dictionary) as DictionaryFields;
  const errors = validateDictionary(dictionary, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('DICTIONARY_INVALID_FIELDS', {
      dictionaryKey,
      projectId,
      errors,
    });
  }

  const existingDictionary = await getDictionaryByKey(dictionaryKey, projectId);

  const result = await DictionaryModel.updateOne(
    { key: dictionaryKey, projectIds: projectId },
    { ...dictionary, content: [existingDictionary.content, dictionary.content] }
  );

  if (result.matchedCount === 0) {
    throw new GenericError('DICTIONARY_UPDATE_FAILED', { dictionaryKey });
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
): Promise<DictionaryDocument> => {
  const dictionary = await DictionaryModel.findByIdAndDelete(dictionaryId);

  if (!dictionary) {
    throw new GenericError('DICTIONARY_NOT_FOUND', { dictionaryId });
  }

  return dictionary;
};
