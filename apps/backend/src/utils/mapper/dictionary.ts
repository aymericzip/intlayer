import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type { Dictionary, DictionaryAPI } from '@/types/dictionary.types';

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
  version?: string
): DictionaryAPI => {
  const dictionaryObject = ensureMongoDocumentToObject<Dictionary>(dictionary);

  const versionList = dictionaryObject.content
    ? [...(dictionaryObject.content.keys() ?? [])]
    : [];
  let returnedVersion = version;

  if (!returnedVersion) {
    const lastVersion = versionList[versionList.length - 1];
    returnedVersion = lastVersion;
  }

  const content = dictionaryObject.content
    ? ((dictionaryObject.content.get(returnedVersion as string)
        ?.content as DictionaryAPI['content']) ?? null)
    : null;

  return {
    ...dictionaryObject,
    content,
    version: returnedVersion,
    localId: `${dictionaryObject.key}::remote::${dictionaryObject.id}`,
    versionList,
  } as unknown as DictionaryAPI;
};
