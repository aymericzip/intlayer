import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type { Dictionary, DictionaryAPI } from '@/types/dictionary.types';
import type { Project } from '@/types/project.types';

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
  version?: string
): DictionaryAPI => {
  const dictionaryObject = ensureMongoDocumentToObject<Dictionary>(dictionary);

  let returnedVersion = version;

  if (!returnedVersion) {
    const versionList = [...(dictionaryObject.content.keys() ?? [])];
    const lastVersion = versionList[versionList.length - 1];
    returnedVersion = lastVersion;
  }

  const content =
    (dictionaryObject.content.get(returnedVersion)
      ?.content as DictionaryAPI['content']) ?? null;

  return {
    ...dictionaryObject,
    content,
    filePath: dictionaryObject.filePath?.[String(projectId)],
  };
};
