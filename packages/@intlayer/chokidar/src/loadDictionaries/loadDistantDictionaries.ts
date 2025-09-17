// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getAppLogger, getConfiguration } from '@intlayer/config';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import { fetchDistantDictionaries } from '../fetchDistantDictionaries';
import { fetchDistantDictionaryKeysAndUpdateTimestamp } from '../fetchDistantDictionaryKeysAndUpdateTimestamp';
import { DictionariesStatus } from '../loadDictionaries/loadDictionaries';
import { sortAlphabetically } from '../utils/sortAlphabetically';

const formatDistantDictionaries = (dictionaries: DictionaryAPI[]) => {
  return dictionaries.map((dict) => ({
    ...dict,
    location: 'distant' as const,
  }));
};

export const loadDistantDictionaries = async (
  configuration = getConfiguration(),
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<DictionaryAPI[]> => {
  const appLogger = getAppLogger(configuration);
  const { editor } = configuration;

  if (!editor.clientId || !editor.clientSecret) {
    throw new Error(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
    );
  }

  try {
    const distantDictionaryUpdateTimeStamp: Record<string, number> =
      await fetchDistantDictionaryKeysAndUpdateTimestamp(configuration);

    const allDictionaries = Object.values(dictionariesRecord);

    const dictionariesToFetch = allDictionaries
      .filter((dictionary) => {
        // If dictionary doesn't have updatedAt, always fetch it
        if (!dictionary?.updatedAt) {
          return true;
        }

        // If remote timestamp doesn't exist, fetch it
        if (!distantDictionaryUpdateTimeStamp[dictionary.key]) {
          return true;
        }

        // If remote timestamp is newer than local, fetch it
        return (
          distantDictionaryUpdateTimeStamp[dictionary.key] >
          dictionary.updatedAt
        );
      })
      .map((dictionary) => dictionary.key);

    const cachedDictionaries: DictionaryAPI[] = allDictionaries
      .filter(
        (dictionary) =>
          dictionary?.updatedAt && !dictionariesToFetch.includes(dictionary.key)
      )
      .map((dictionary) => ({
        ...dictionary,
        location: 'distant' as const,
      }));

    // Report cached as already imported
    if (cachedDictionaries.length > 0) {
      onStatusUpdate?.(
        cachedDictionaries.map((d) => ({
          dictionaryKey: d.key,
          type: 'remote',
          status: 'imported',
        }))
      );
    }

    const orderedDistantDictionaryKeys =
      dictionariesToFetch.sort(sortAlphabetically);

    // Report pending for keys to be fetched so totals are visible immediately
    if (orderedDistantDictionaryKeys.length > 0) {
      onStatusUpdate?.(
        orderedDistantDictionaryKeys.map((key) => ({
          dictionaryKey: key,
          type: 'remote',
          status: 'pending',
        }))
      );
    }

    const distantDictionariesData = await fetchDistantDictionaries(
      {
        dictionaryKeys: orderedDistantDictionaryKeys,
      },
      onStatusUpdate
    );

    const distantDictionaries: DictionaryAPI[] = formatDistantDictionaries(
      distantDictionariesData
    );

    return [...cachedDictionaries, ...distantDictionaries];
  } catch (error) {
    appLogger('Failed to fetch distant dictionaries', { level: 'error' });
    return [];
  }
};
