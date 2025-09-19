// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getAppLogger, getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import remoteDictionariesRecord from '@intlayer/remote-dictionaries-entry';
import { fetchDistantDictionaries } from '../fetchDistantDictionaries';
import { fetchDistantDictionaryKeysAndUpdateTimestamp } from '../fetchDistantDictionaryKeysAndUpdateTimestamp';
import { DictionariesStatus } from '../loadDictionaries/loadDictionaries';
import { sortAlphabetically } from '../utils/sortAlphabetically';

export const formatDistantDictionaries = (
  dictionaries: DictionaryAPI[]
): Dictionary[] =>
  dictionaries.map((dict) => ({
    ...dict,
    localId: `${dict.key}::remote::${dict.id}`,
    location: 'distant' as const,
  }));

export const loadRemoteDictionaries = async (
  configuration = getConfiguration(),
  onStatusUpdate?: (status: DictionariesStatus[]) => void
): Promise<DictionaryAPI[]> => {
  const appLogger = getAppLogger(configuration);
  const { editor } = configuration;

  const hasRemoteDictionaries = Boolean(editor.clientId && editor.clientSecret);

  if (!hasRemoteDictionaries) return [];

  try {
    const distantDictionaryUpdateTimeStamp: Record<string, number> =
      await fetchDistantDictionaryKeysAndUpdateTimestamp(configuration);

    const dictionariesKeysToFetch = Object.entries(
      distantDictionaryUpdateTimeStamp
    )
      .filter(([dictionaryKey, updatedAt]) => {
        // If dictionary doesn't have updatedAt, always fetch it
        if (!updatedAt) return true;

        // If remote timestamp doesn't exist, fetch it
        if (!remoteDictionariesRecord[dictionaryKey]) return true;

        // If remote timestamp is newer than local, fetch it
        return remoteDictionariesRecord[dictionaryKey] > updatedAt;
      })
      .map(([dictionaryKey]) => dictionaryKey);

    const cachedDictionaries = Object.values(remoteDictionariesRecord).filter(
      (dictionary) =>
        dictionary?.updatedAt &&
        !dictionariesKeysToFetch.includes(dictionary.key)
    );

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
      dictionariesKeysToFetch.sort(sortAlphabetically);

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
