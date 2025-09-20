// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getAppLogger, getConfiguration, x } from '@intlayer/config';
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
      .filter(([dictionaryKey, remoteUpdatedAt]) => {
        // If remote doesn't provide updatedAt, fetch to be safe
        if (!remoteUpdatedAt) return true;

        // If no local cache exists, fetch
        const local = (remoteDictionariesRecord as any)[dictionaryKey];
        if (!local) return true;

        const localUpdatedAtRaw = (local as any)?.updatedAt as
          | number
          | string
          | undefined;
        const localUpdatedAt =
          typeof localUpdatedAtRaw === 'number'
            ? localUpdatedAtRaw
            : localUpdatedAtRaw
              ? new Date(localUpdatedAtRaw).getTime()
              : undefined;

        // If local timestamp missing or older than remote, fetch
        if (typeof localUpdatedAt !== 'number') return true;
        return remoteUpdatedAt > localUpdatedAt;
      })
      .map(([dictionaryKey]) => dictionaryKey);

    const cachedDictionaries = Object.entries(remoteDictionariesRecord)
      .filter(([key, dictionary]) => {
        const remoteUpdatedAt = distantDictionaryUpdateTimeStamp[key];
        const localUpdatedAtRaw = (dictionary as any)?.updatedAt as
          | number
          | string
          | undefined;
        const localUpdatedAt =
          typeof localUpdatedAtRaw === 'number'
            ? localUpdatedAtRaw
            : localUpdatedAtRaw
              ? new Date(localUpdatedAtRaw).getTime()
              : undefined;
        // Consider as cached/imported when local exists and is up-to-date or newer
        return (
          typeof localUpdatedAt === 'number' &&
          typeof remoteUpdatedAt === 'number' &&
          localUpdatedAt >= remoteUpdatedAt
        );
      })
      .map(([, dictionary]) => dictionary as any);

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
    appLogger(`${x} Failed to fetch distant dictionaries`, { level: 'error' });
    return [];
  }
};
