// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { fetchDistantDictionaries } from '../fetchDistantDictionaries';

type LoadDistantDictionariesOptions = {
  dictionaryKeys: string[];
  newDictionariesPath?: string;
};

export const loadDistantDictionaries = async (
  options: LoadDistantDictionariesOptions
): Promise<DictionaryAPI[]> => {
  try {
    const distantDictionaries = await fetchDistantDictionaries(options);

    return distantDictionaries;
  } catch (error) {
    console.error(error);
    return [];
  }
};
