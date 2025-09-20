import { getIntlayerAPI } from '@intlayer/api';
import {
  writeContentDeclaration,
  type DictionaryStatus,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  spinnerFrames,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import pLimit from 'p-limit';
import * as readline from 'readline';

type PullOptions = {
  dictionaries?: string[];
  newDictionariesPath?: string;
  configOptions?: GetConfigurationOptions;
};

type DictionariesStatus = {
  dictionaryKey: string;
  status: DictionaryStatus;
  icon: string;
  index: number;
  error?: Error;
  errorMessage?: string;
  spinnerFrameIndex?: number;
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

    const intlayerAPI = getIntlayerAPI(undefined, config);

    const oAuth2TokenResult = await intlayerAPI.oAuth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    // Get the list of dictionary keys
    const getDictionariesKeysResult =
      await intlayerAPI.dictionary.getDictionariesKeys({
        ...(oAuth2AccessToken && {
          headers: {
            Authorization: `Bearer ${oAuth2AccessToken}`,
          },
        }),
      });

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
      distantDictionariesKeys.map((dictionaryKey, index) => ({
        dictionaryKey,
        icon: getStatusIcon('pending'),
        status: 'pending',
        index,
        spinnerFrameIndex: 0,
      }));

    // Output initial statuses
    for (const statusObj of dictionariesStatuses) {
      process.stdout.write(getStatusLine(statusObj) + '\n');
    }

    // Start spinner timer
    const spinnerTimer = setInterval(() => {
      updateAllStatusLines(dictionariesStatuses);
    }, 100); // Update every 100ms

    // Process dictionaries in parallel with a concurrency limit
    const limit = pLimit(5); // Limit the number of concurrent requests

    const successfullyFetchedDictionaries: Dictionary[] = [];

    const processDictionary = async (
      statusObj: DictionariesStatus
    ): Promise<void> => {
      statusObj.status = 'fetching';
      try {
        // Fetch the dictionary
        const getDictionaryResult = await intlayerAPI.dictionary.getDictionary(
          statusObj.dictionaryKey,
          undefined,
          {
            ...(oAuth2AccessToken && {
              headers: {
                Authorization: `Bearer ${oAuth2AccessToken}`,
              },
            }),
          }
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

        successfullyFetchedDictionaries.push(distantDictionary);
      } catch (error) {
        statusObj.status = 'error';
        statusObj.error = error as Error;
        statusObj.errorMessage = `Error fetching dictionary ${statusObj.dictionaryKey}: ${error}`;
      }
    };

    const fetchPromises = dictionariesStatuses.map((statusObj) =>
      limit(() => processDictionary(statusObj))
    );

    await Promise.all(fetchPromises);

    // Stop the spinner timer
    clearInterval(spinnerTimer);

    // Update statuses one last time
    updateAllStatusLines(dictionariesStatuses);

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

const getStatusIcon = (status: string): string => {
  const statusIcons: Record<string, string> = {
    pending: '⏲',
    fetching: '', // Spinner handled separately
    'up-to-date': '✔',
    updated: '✔',
    fetched: '✔',
    error: '✖',
  };
  return statusIcons[status] ?? '';
};

const getStatusLine = (statusObj: DictionariesStatus): string => {
  let icon = getStatusIcon(statusObj.status);
  let colorStart = '';
  let colorEnd = '';

  if (statusObj.status === 'fetching') {
    // Use spinner frame
    icon = spinnerFrames[statusObj.spinnerFrameIndex! % spinnerFrames.length];
    colorStart = ANSIColors.BLUE;
    colorEnd = ANSIColors.RESET;
  } else if (statusObj.status === 'error') {
    colorStart = ANSIColors.RED;
    colorEnd = ANSIColors.RESET;
  } else if (
    statusObj.status === 'fetched' ||
    statusObj.status === 'imported' ||
    statusObj.status === 'updated' ||
    statusObj.status === 'up-to-date'
  ) {
    colorStart = ANSIColors.GREEN;
    colorEnd = ANSIColors.RESET;
  } else if (
    statusObj.status === 'reimported in JSON' ||
    statusObj.status === 'reimported in new location'
  ) {
    colorStart = ANSIColors.YELLOW;
    colorEnd = ANSIColors.RESET;
  } else {
    colorStart = ANSIColors.GREY;
    colorEnd = ANSIColors.RESET;
  }

  return `- ${statusObj.dictionaryKey} ${ANSIColors.GREY_DARK}[${colorStart}${icon}${statusObj.status}${ANSIColors.GREY_DARK}]${colorEnd}`;
};

const updateAllStatusLines = (dictionariesStatuses: DictionariesStatus[]) => {
  // Move cursor up to the first status line
  readline.moveCursor(process.stdout, 0, -dictionariesStatuses.length);
  for (const statusObj of dictionariesStatuses) {
    // Clear the line
    readline.clearLine(process.stdout, 0);

    if (statusObj.status === 'fetching') {
      // Update spinner frame
      statusObj.spinnerFrameIndex =
        (statusObj.spinnerFrameIndex! + 1) % spinnerFrames.length;
    }

    // Write the status line
    process.stdout.write(getStatusLine(statusObj) + '\n');
  }
};
