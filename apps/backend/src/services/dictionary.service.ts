import { DictionaryModel } from '@models/dictionary.model';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { GenericError } from '@utils/errors';
import type { DictionaryFilters } from '@utils/filtersAndPagination/getDictionaryFiltersAndPagination';
import { removeObjectKeys } from '@utils/removeObjectKeys';
import {
  type DictionaryFields,
  validateDictionary,
} from '@utils/validation/validateDictionary';
import { ObjectId } from 'mongoose';
import type {
  Dictionary,
  DictionaryData,
  DictionaryDocument,
} from '@/types/dictionary.types';
import type { Project } from '@/types/project.types';

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
): Promise<DictionaryDocument[]> => {
  try {
    const dictionaries = await DictionaryModel.aggregate<DictionaryDocument>([
      // Stage 1: Match the filters
      { $match: filters },

      // Stage 2: Skip for pagination
      { $skip: skip },

      // Stage 3: Limit the number of documents
      { $limit: limit },

      // Stage 4: Add the 'availableVersions' field
      {
        $addFields: {
          availableVersions: {
            $map: {
              input: { $objectToArray: '$content' },
              as: 'version',
              in: '$$version.k',
            },
          },
        },
      },

      // (Optional) Stage 5: Project the fields you want to include/exclude
      // For example, to exclude the entire 'content' field and keep only 'availableVersions'
      // {
      //   $project: {
      //     content: 0 // Exclude the 'content' field
      //   }
      // }
    ]);

    return dictionaries;
  } catch (error) {
    console.error('Error fetching dictionaries:', error);
    throw error;
  }
};

/**
 * Finds a dictionary by its ID.
 * @param dictionaryId - The ID of the dictionary to find.
 * @returns The dictionary matching the ID.
 */
/**
 * Finds a dictionary by its ID and includes the 'availableVersions' field.
 * @param dictionaryId - The ID of the dictionary to find.
 * @returns The dictionary matching the ID with available versions.
 */
export const getDictionaryById = async (
  dictionaryId: string | ObjectId
): Promise<DictionaryDocument> => {
  const dictionary = await DictionaryModel.aggregate<DictionaryDocument>([
    // Stage 1: Match the document by ID
    { $match: { _id: dictionaryId } },

    // Stage 2: Add the 'availableVersions' field
    {
      $addFields: {
        availableVersions: {
          $map: {
            input: { $objectToArray: '$content' },
            as: 'version',
            in: '$$version.k',
          },
        },
      },
    },
  ]);

  if (!dictionary.length) {
    throw new GenericError('DICTIONARY_NOT_FOUND', { dictionaryId });
  }

  return dictionary[0];
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
  const dictionaries = await getDictionariesByKeys([dictionaryKey], projectId);

  console.log('dictionaries', dictionaries);

  return dictionaries[0];
};

export const getDictionariesByKeys = async (
  dictionaryKeys: string[],
  projectId: string | ObjectId
): Promise<DictionaryDocument[]> => {
  const dictionaries = await DictionaryModel.aggregate<DictionaryDocument>([
    // Stage 1: Match the document by key
    { $match: { key: { $in: dictionaryKeys }, projectIds: projectId } },

    // Stage 2: Add the 'availableVersions' field
    {
      $addFields: {
        availableVersions: {
          $map: {
            input: { $objectToArray: '$content' },
            as: 'version',
            in: '$$version.k',
          },
        },
      },
    },
  ]);

  if (!dictionaries) {
    throw new GenericError('DICTIONARY_NOT_FOUND', {
      dictionaryKeys,
      projectId,
    });
  }

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

export const getDictionariesByTags = async (
  tags: string[],
  projectId: string | Project['_id']
): Promise<DictionaryDocument[]> => {
  const dictionaries = await DictionaryModel.aggregate<DictionaryDocument>([
    // Stage 1: Match the document by tags
    {
      $match: {
        tags: { $in: tags },
        projectIds: projectId,
      },
    },

    // Stage 2: Add the 'availableVersions' field
    {
      $addFields: {
        availableVersions: {
          $map: {
            input: { $objectToArray: '$content' },
            as: 'version',
            in: '$$version.k',
          },
        },
      },
    },
  ]);

  return dictionaries;
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
  const dictionaryObject = ensureMongoDocumentToObject(dictionary);
  const dictionaryToUpdate = removeObjectKeys(dictionaryObject, ['_id']);

  const updatedKeys = Object.keys(dictionaryToUpdate) as DictionaryFields;
  const errors = await validateDictionary(dictionaryToUpdate, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('DICTIONARY_INVALID_FIELDS', {
      dictionaryId,
      errors,
    });
  }

  const result = await DictionaryModel.updateOne(
    { _id: dictionaryId },
    dictionaryToUpdate
  );

  if (result.matchedCount === 0) {
    throw new GenericError('DICTIONARY_UPDATE_FAILED', { dictionaryId });
  }

  const updatedDictionary = await getDictionaryById(dictionaryId);

  return updatedDictionary;
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
  const dictionaryObject = ensureMongoDocumentToObject(dictionary);

  const dictionaryToUpdate = removeObjectKeys(dictionaryObject, ['_id']);

  const updatedKeys = Object.keys(dictionaryToUpdate) as DictionaryFields;
  const errors = await validateDictionary(dictionaryToUpdate, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('DICTIONARY_INVALID_FIELDS', {
      dictionaryKey,
      projectId,
      errors,
    });
  }

  const result = await DictionaryModel.updateOne(
    { key: dictionaryKey, projectIds: projectId },
    dictionaryToUpdate
  );

  if (result.matchedCount === 0) {
    throw new GenericError('DICTIONARY_UPDATE_FAILED', { dictionaryKey });
  }

  const updatedDictionary = await getDictionaryByKey(dictionaryKey, projectId);

  return updatedDictionary;
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

export const incrementVersion = (dictionary: Dictionary): string => {
  const VERSION_PREFIX = 'v';
  const availableVersions = dictionary.availableVersions ?? [];

  // Get the current version from the version list, default to 'v1' if not present
  const currentVersion =
    availableVersions.length > 0
      ? availableVersions[availableVersions.length - 1]
      : 'v1';

  // Function to extract the numeric part of the version
  const getVersionNumber = (version: string): number => {
    const match = version.match(/^v(\d+)$/);
    if (!match) {
      throw new Error(`Invalid version format: ${version}`);
    }
    return parseInt(match[1], 10);
  };

  // Start with the next version number
  let newNumber = getVersionNumber(currentVersion) + 1;
  let newVersion = `${VERSION_PREFIX}${newNumber}`;

  // Loop until a unique version is found
  while (availableVersions.includes(newVersion)) {
    newNumber += 1;
    newVersion = `${VERSION_PREFIX}${newNumber}`;
  }

  return newVersion;
};
