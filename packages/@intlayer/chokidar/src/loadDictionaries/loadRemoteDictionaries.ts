import { getIntlayerAPIProxy } from '@intlayer/api';
// @ts-ignore @intlayer/backend is not build yet
import type { DictionaryAPI } from '@intlayer/backend';
import { getConfiguration } from '@intlayer/config';
import { getRemoteDictionaries } from '@intlayer/remote-dictionaries-entry';
import type { Dictionary, DictionaryId, DictionaryKey } from '@intlayer/types';
import { fetchDistantDictionaries } from '../fetchDistantDictionaries';
import type { DictionariesStatus } from '../loadDictionaries/loadDictionaries';
import { sortAlphabetically } from '../utils/sortAlphabetically';

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

    const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

    // Get the list of dictionary keys
    const getDictionariesKeysResult =
      await intlayerAPI.dictionary.getDictionariesUpdateTimestamp();

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

    const orderedDistantDictionaryKeys = dictionariesIdToFetch
      .map(([, data]) => data.key)
      .sort(sortAlphabetically);

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

    return [...cachedDictionaries, ...distantDictionaries];
  } catch (error) {
    options?.onError?.(error as Error);
    return [];
  } finally {
    options?.onStopRemoteCheck?.();
  }
};
