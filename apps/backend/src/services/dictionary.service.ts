import { logger } from '@logger/index';
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
