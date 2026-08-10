import { createIntlayerCMS } from '@intlayer/api';
import { dictionaryEndpoint } from '@intlayer/api/dictionary';
// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config/node';
import { getRemoteDictionaries } from '@intlayer/remote-dictionaries-entry';
import type {
  Dictionary,
  DictionaryId,
  DictionaryKey,
} from '@intlayer/types/dictionary';
import { fetchDistantDictionaries } from '../fetchDistantDictionaries';
import { sortAlphabetically } from '../utils/sortAlphabetically';
import type { DictionariesStatus } from './loadDictionaries';

export const formatDistantDictionaries = (
  dictionaries: (DictionaryAPI | Dictionary)[]
): Dictionary[] =>
  dictionaries.map((dict) => ({
    ...dict,
    localId: `${dict.key}::remote::${dict.id}`,
    location: 'remote' as const,
  }));

export const loadRemoteDictionaries = async (
  configuration = getConfiguration(),
  onStatusUpdate?: (status: DictionariesStatus[]) => void,
  options?: {
    onStartRemoteCheck?: () => void;
    onStopRemoteCheck?: () => void;
    onError?: (error: Error) => void;
  }
): Promise<Dictionary[]> => {
  const { editor } = configuration;
  const remoteDictionariesRecord = getRemoteDictionaries(configuration);

  const hasRemoteDictionaries = Boolean(editor.clientId && editor.clientSecret);

  if (!hasRemoteDictionaries) return [];

  try {
    options?.onStartRemoteCheck?.();

    const dictionary = dictionaryEndpoint(createIntlayerCMS(configuration));

    // Get the list of dictionary keys
    const getDictionariesKeysResult =
      await dictionary.getDictionariesUpdateTimestamp();

    const distantDictionaryUpdateTimeStamp: Record<
      DictionaryId,
      { key: DictionaryKey; updatedAt: number }
    > | null = getDictionariesKeysResult.data;

    if (!distantDictionaryUpdateTimeStamp) {
      throw new Error('No distant dictionaries found');
    }

    const dictionariesIdToFetch = Object.entries(
      distantDictionaryUpdateTimeStamp
    ).filter(([dictionaryId, data]) => {
      // If remote doesn't provide updatedAt, fetch to be safe
      if (!data.updatedAt) return true;

      // If no local cache exists, fetch
      const local: Dictionary | undefined = remoteDictionariesRecord[
        data.key
      ]?.find((dictionary) => dictionary.id === dictionaryId);
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

      return data.updatedAt > localUpdatedAt;
    });

    const flatRemoteDictionariesRecord: DictionaryAPI[] = Object.values(
      remoteDictionariesRecord
    ).flat();

    const cachedDictionaries: Dictionary[] =
      flatRemoteDictionariesRecord.filter((dictionary) => {
        const remoteUpdatedAt =
          distantDictionaryUpdateTimeStamp[dictionary.id!].updatedAt;

        const localUpdatedAtRaw = dictionary.updatedAt;

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
      });

    // Report cached as already imported
    if (cachedDictionaries.length > 0) {
      onStatusUpdate?.(
        cachedDictionaries.map((dictionary) => ({
          dictionaryKey: dictionary.key,
          type: 'remote',
          status: 'imported',
        }))
      );
    }

    // Several qualified dictionaries can share a key, so keys are deduplicated:
    // one request per key already returns all of its siblings.
    const orderedDistantDictionaryKeys = [
      ...new Set(dictionariesIdToFetch.map(([, data]) => data.key)),
    ].sort(sortAlphabetically);

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

    const distantDictionaries: Dictionary[] = formatDistantDictionaries(
      distantDictionariesData
    );

    // Fetching by key also returns the up-to-date siblings of a stale
    // dictionary, so drop the cached copies the remote just sent back.
    const fetchedDictionaryIds = new Set(
      distantDictionaries.map((dictionary) => dictionary.id)
    );

    const notRefetchedCachedDictionaries = cachedDictionaries.filter(
      (dictionary) => !fetchedDictionaryIds.has(dictionary.id)
    );

    return [...notRefetchedCachedDictionaries, ...distantDictionaries];
  } catch (error) {
    options?.onError?.(error as Error);
    return [];
  } finally {
    options?.onStopRemoteCheck?.();
  }
};
