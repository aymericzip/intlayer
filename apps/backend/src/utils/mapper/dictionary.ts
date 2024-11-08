import {
  Dictionary,
  DictionaryAPI,
  DictionaryDocument,
} from '@/types/dictionary.types';
import { Project } from '@/types/project.types';

/**
 * Maps a dictionary to an API response.
 * If the version is not provided, the latest version is used.
 *
 * @param dictionary - The dictionary to map.
 * @param projectId - The ID of the project the dictionary belongs to.
 * @returns The dictionary mapped to an API response.
 */
export const mapDictionaryToAPI = (
  dictionary: Dictionary,
  projectId: string | Project['_id'],
  version?: number
): DictionaryAPI => {
  let dictionaryObject: Dictionary = dictionary;

  // If the dictionary is a mongoose document, convert it to an object
  if (typeof (dictionary as DictionaryDocument).toObject === 'function') {
    dictionaryObject = (dictionary as DictionaryDocument).toObject();
  }

  const content = dictionaryObject.content[version ?? 0];

  return {
    ...dictionaryObject,
    content,
    filePath: dictionaryObject.filePath?.[String(projectId)],
  };
};
