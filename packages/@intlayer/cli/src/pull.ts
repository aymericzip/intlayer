import { getIntlayerAPIProxy } from '@intlayer/api';
import {
  parallelize,
  writeContentDeclaration,
  type DictionaryStatus,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
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

    // Get the list of dictionary keys
    const getDictionariesKeysResult =
      await intlayerAPI.dictionary.getDictionariesKeys();

    if (!getDictionariesKeysResult.data) {
      throw new Error('No distant dictionaries found');
    }

    let distantDictionariesKeys: string[] = getDictionariesKeysResult.data;

    if (options?.dictionaries) {
      // Filter the dictionaries from the provided list of IDs
      distantDictionariesKeys = distantDictionariesKeys.filter(
        (dictionaryKey) => options.dictionaries!.includes(dictionaryKey)
      );
    }

    // Check if dictionaries list is empty
    if (distantDictionariesKeys.length === 0) {
      appLogger('No dictionaries to fetch', {
        level: 'error',
      });
      return;
    }

    appLogger('Fetching dictionaries:');

    // Prepare dictionaries statuses
    const dictionariesStatuses: DictionariesStatus[] =
      distantDictionariesKeys.map((dictionaryKey) => ({
        dictionaryKey,
        status: 'pending',
      }));

    // Initialize aggregated logger
    const logger = new PullLogger();
    logger.update(
      dictionariesStatuses.map<PullStatus>((s) => ({
        dictionaryKey: s.dictionaryKey,
        status: 'pending',
      }))
    );

    const successfullyFetchedDictionaries: Dictionary[] = [];

    const processDictionary = async (
      statusObj: DictionariesStatus
    ): Promise<void> => {
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
    await parallelize(dictionariesStatuses, processDictionary, 5);

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
