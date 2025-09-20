import { getIntlayerAPIProxy } from '@intlayer/api';
import {
  parallelize,
  writeContentDeclaration,
  type DictionaryStatus,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  ESMxCJSRequire,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { existsSync } from 'fs';
import { join } from 'path';
import { PullLogger, type PullStatus } from './pullLog';

type PullOptions = {
  dictionaries?: string[];
  newDictionariesPath?: string;
  configOptions?: GetConfigurationOptions;
};

type DictionariesStatus = {
  dictionaryKey: string;
  status: DictionaryStatus | 'pending' | 'fetching' | 'error';
  error?: Error;
  errorMessage?: string;
};

/**
 * Fetch distant dictionaries and write them locally,
 * with progress indicators and concurrency control.
 */
export const pull = async (options?: PullOptions): Promise<void> => {
  const appLogger = getAppLogger(options?.configOptions?.override, {
    config: {
      prefix: '',
    },
  });

  try {
    const config = getConfiguration(options?.configOptions);
    const { clientId, clientSecret } = config.editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const intlayerAPI = getIntlayerAPIProxy(undefined, config);

    // Get remote update timestamps map
    const getDictionariesUpdateTimestampResult =
      await intlayerAPI.dictionary.getDictionariesUpdateTimestamp();

    if (!getDictionariesUpdateTimestampResult.data) {
      throw new Error('No distant dictionaries found');
    }

    let distantDictionariesUpdateTimeStamp: Record<string, number> =
      getDictionariesUpdateTimestampResult.data;

    // Optional filtering by requested dictionaries
    if (options?.dictionaries) {
      distantDictionariesUpdateTimeStamp = Object.fromEntries(
        Object.entries(distantDictionariesUpdateTimeStamp).filter(([key]) =>
          options.dictionaries!.includes(key)
        )
      );
    }

    // Load local cached remote dictionaries (if any)
    const remoteDictionariesPath = join(
      config.content.mainDir,
      'remote_dictionaries.cjs'
    );
    const remoteDictionariesRecord: Record<string, any> = existsSync(
      remoteDictionariesPath
    )
      ? (ESMxCJSRequire(remoteDictionariesPath) as any)
      : {};

    // Determine which keys need fetching by comparing updatedAt with local cache
    const entries = Object.entries(distantDictionariesUpdateTimeStamp);
    const keysToFetch = entries
      .filter(([key, remoteUpdatedAt]) => {
        if (!remoteUpdatedAt) return true;
        const local = (remoteDictionariesRecord as any)[key];
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
        if (typeof localUpdatedAt !== 'number') return true;
        return remoteUpdatedAt > localUpdatedAt;
      })
      .map(([key]) => key);

    const cachedKeys = entries
      .filter(([key, remoteUpdatedAt]) => {
        const local = (remoteDictionariesRecord as any)[key];
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
        return (
          typeof localUpdatedAt === 'number' &&
          typeof remoteUpdatedAt === 'number' &&
          localUpdatedAt >= remoteUpdatedAt
        );
      })
      .map(([key]) => key);

    // Check if dictionaries list is empty
    if (entries.length === 0) {
      appLogger('No dictionaries to fetch', {
        level: 'error',
      });
      return;
    }

    appLogger('Fetching dictionaries:');

    // Prepare dictionaries statuses
    const dictionariesStatuses: DictionariesStatus[] = [
      ...cachedKeys.map((dictionaryKey) => ({
        dictionaryKey,
        status: 'imported' as DictionaryStatus,
      })),
      ...keysToFetch.map((dictionaryKey) => ({
        dictionaryKey,
        status: 'pending' as const,
      })),
    ];

    // Initialize aggregated logger
    const logger = new PullLogger();
    logger.update(
      dictionariesStatuses.map<PullStatus>((s) => ({
        dictionaryKey: s.dictionaryKey,
        status: s.status,
      }))
    );

    const successfullyFetchedDictionaries: Dictionary[] = [];

    const processDictionary = async (
      statusObj: DictionariesStatus
    ): Promise<void> => {
      if (
        statusObj.status === 'imported' ||
        statusObj.status === 'up-to-date'
      ) {
        // Already up-to-date; nothing to do
        return;
      }
      statusObj.status = 'fetching';
      logger.update([
        { dictionaryKey: statusObj.dictionaryKey, status: 'fetching' },
      ]);
      try {
        // Fetch the dictionary
        const getDictionaryResult = await intlayerAPI.dictionary.getDictionary(
          statusObj.dictionaryKey
        );

        const distantDictionary = getDictionaryResult.data;

        if (!distantDictionary) {
          throw new Error(
            `Dictionary ${statusObj.dictionaryKey} not found on remote`
          );
        }

        // Now, write the dictionary to local file
        const { status } = await writeContentDeclaration(
          distantDictionary,
          config,
          options?.newDictionariesPath
        );

        statusObj.status = status;
        logger.update([{ dictionaryKey: statusObj.dictionaryKey, status }]);

        successfullyFetchedDictionaries.push(distantDictionary);
      } catch (error) {
        statusObj.status = 'error';
        statusObj.error = error as Error;
        statusObj.errorMessage = `Error fetching dictionary ${statusObj.dictionaryKey}: ${error}`;
        logger.update([
          { dictionaryKey: statusObj.dictionaryKey, status: 'error' },
        ]);
      }
    };

    // Process dictionaries in parallel with concurrency limit
    await parallelize(
      dictionariesStatuses.filter(
        (s) => s.status === 'pending' || s.status === 'fetching'
      ),
      processDictionary,
      5
    );

    // Stop the logger and render final state
    logger.finish();

    // Per-dictionary summary
    const iconFor = (status: DictionariesStatus['status']) => {
      switch (status) {
        case 'fetched':
        case 'imported':
        case 'updated':
        case 'up-to-date':
        case 'reimported in JSON':
        case 'reimported in new location':
          return '✔';
        case 'error':
          return '✖';
        default:
          return '⏲';
      }
    };

    const colorFor = (status: DictionariesStatus['status']) => {
      switch (status) {
        case 'fetched':
        case 'imported':
        case 'updated':
        case 'up-to-date':
          return ANSIColors.GREEN;
        case 'reimported in JSON':
        case 'reimported in new location':
          return ANSIColors.YELLOW;
        case 'error':
          return ANSIColors.RED;
        default:
          return ANSIColors.BLUE;
      }
    };

    for (const s of dictionariesStatuses) {
      const icon = iconFor(s.status);
      const color = colorFor(s.status);
      appLogger(
        ` - ${s.dictionaryKey} ${ANSIColors.GREY}[${color}${icon} ${s.status}${ANSIColors.GREY}]${ANSIColors.RESET}`
      );
    }

    // Output any error messages
    for (const statusObj of dictionariesStatuses) {
      if (statusObj.errorMessage) {
        appLogger(statusObj.errorMessage, {
          level: 'error',
        });
      }
    }
  } catch (error) {
    appLogger(error, {
      level: 'error',
    });
  }
};
