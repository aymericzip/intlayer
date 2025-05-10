// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { fetchDistantDictionaries } from '../fetchDistantDictionaries';

type LoadDistantDictionariesOptions = {
  dictionaryKeys: string[];
  newDictionariesPath?: string;
};

const formatDistantDictionaries = (dictionaries: DictionaryAPI[]) => {
  return dictionaries.map((dict) => ({
    ...dict,
    location: 'distant' as const,
  }));
};

export const loadDistantDictionaries = async (
  options: LoadDistantDictionariesOptions
): Promise<DictionaryAPI[]> => {
  try {
    const distantDictionaries = await fetchDistantDictionaries(options);

    return formatDistantDictionaries(distantDictionaries);
  } catch (error) {
    console.error(error);
    return [];
  }
};
