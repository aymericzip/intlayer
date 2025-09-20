import { getIntlayerAPIProxy } from '@intlayer/api';
import {
  formatPath,
  listGitFiles,
  ListGitFilesOptions,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  spinnerFrames,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import * as fsPromises from 'fs/promises';
import pLimit from 'p-limit';
import * as readline from 'readline';

type PushOptions = {
  deleteLocaleDictionary?: boolean;
  keepLocaleDictionary?: boolean;
  dictionaries?: string[];
  gitOptions?: ListGitFilesOptions;
  configOptions?: GetConfigurationOptions;
};

type DictionariesStatus = {
  dictionary: Dictionary;
  status: 'pending' | 'pushing' | 'modified' | 'pushed' | 'unknown' | 'error';
  icon: string;
  index: number;
  error?: Error;
  errorMessage?: string;
  spinnerFrameIndex?: number;
};

/**
 * Get all local dictionaries and push them simultaneously.
 */
export const push = async (options?: PushOptions): Promise<void> => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });
  const { clientId, clientSecret } = config.editor;
  try {
    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const intlayerAPI = getIntlayerAPIProxy(undefined, config);

    let dictionaries: Dictionary[] = Object.values(dictionariesRecord);
    const existingDictionariesKeys: string[] = Object.keys(dictionariesRecord);

    if (options?.dictionaries) {
      // Check if the provided dictionaries exist
      const noneExistingDictionariesOption = options.dictionaries.filter(
        (dictionaryId) => !existingDictionariesKeys.includes(dictionaryId)
      );

      if (noneExistingDictionariesOption.length > 0) {
        appLogger(
          `The following dictionaries do not exist: ${noneExistingDictionariesOption.join(
            ', '
          )} and have been ignored.`,
          {
            level: 'error',
          }
        );
      }

      // Filter the dictionaries from the provided list of IDs
      dictionaries = dictionaries.filter((dictionary) =>
        options.dictionaries!.includes(dictionary.key)
      );
    }

    if (options?.gitOptions) {
      const gitFiles = await listGitFiles(options.gitOptions);
    }

    // Check if the dictionaries list is empty
    if (dictionaries.length === 0) {
      appLogger('No local dictionaries found', {
        level: 'error',
      });
      return;
    }

    appLogger('Pushing dictionaries:', {});

    // Prepare dictionaries statuses
    const dictionariesStatuses: DictionariesStatus[] = dictionaries.map(
      (dictionary, index) => ({
        dictionary,
        icon: getStatusIcon('pending'),
        status: 'pending',
        index,
        spinnerFrameIndex: 0,
      })
    );

    // Output initial statuses
    for (const statusObj of dictionariesStatuses) {
      process.stdout.write(getStatusLine(statusObj) + '\n');
    }

    const successfullyPushedDictionaries: Dictionary[] = [];

    // Start spinner timer
    const spinnerTimer = setInterval(() => {
      updateAllStatusLines(dictionariesStatuses);
    }, 100); // Update every 100ms

    const processDictionary = async (
      statusObj: DictionariesStatus
    ): Promise<void> => {
      statusObj.status = 'pushing';

      try {
        const pushResult = await intlayerAPI.dictionary.pushDictionaries([
          statusObj.dictionary,
        ]);

        const updatedDictionaries = pushResult.data?.updatedDictionaries || [];
        const newDictionaries = pushResult.data?.newDictionaries || [];

        if (updatedDictionaries.includes(statusObj.dictionary.key)) {
          statusObj.status = 'modified';
          successfullyPushedDictionaries.push(statusObj.dictionary);
        } else if (newDictionaries.includes(statusObj.dictionary.key)) {
          statusObj.status = 'pushed';
          successfullyPushedDictionaries.push(statusObj.dictionary);
        } else {
          statusObj.status = 'unknown';
        }
      } catch (error) {
        statusObj.status = 'error';
        statusObj.error = error as Error;
        statusObj.errorMessage = `Error pushing dictionary ${statusObj.dictionary.key}: ${error}`;
      }
    };

    // Process dictionaries in parallel with a concurrency limit
    const limit = pLimit(5); // Limit the number of concurrent requests
    const pushPromises = dictionariesStatuses.map((statusObj) =>
      limit(() => processDictionary(statusObj))
    );
    await Promise.all(pushPromises);

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

    // Handle delete or keep options
    const deleteOption = options?.deleteLocaleDictionary;
    const keepOption = options?.keepLocaleDictionary;

    if (deleteOption && keepOption) {
      throw new Error(
        'Cannot specify both --deleteLocaleDictionary and --keepLocaleDictionary options.'
      );
    }

    if (deleteOption) {
      // Delete only the successfully pushed dictionaries
      await deleteLocalDictionaries(successfullyPushedDictionaries, options);
    } else if (keepOption) {
      // Do nothing, keep the local dictionaries
    } else {
      // Ask the user
      const answer = await askUser(
        'Do you want to delete the local dictionaries that were successfully pushed? (yes/no): '
      );
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        await deleteLocalDictionaries(successfullyPushedDictionaries, options);
      }
    }
  } catch (error) {
    appLogger(error, {
      level: 'error',
    });
  }
};

const askUser = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
};

const deleteLocalDictionaries = async (
  dictionariesToDelete: Dictionary[],
  options?: PushOptions
): Promise<void> => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });

  // Use a Set to collect all unique file paths
  const filePathsSet: Set<string> = new Set();

  for (const dictionary of dictionariesToDelete) {
    const { filePath } = dictionary;

    if (!filePath) {
      appLogger(`Dictionary ${dictionary.key} does not have a file path`, {
        level: 'error',
      });
      continue;
    }

    filePathsSet.add(filePath);
  }

  for (const filePath of filePathsSet) {
    try {
      const stats = await fsPromises.lstat(filePath);

      if (stats.isFile()) {
        await fsPromises.unlink(filePath);
        appLogger(`Deleted file ${formatPath(filePath)}`, {});
      } else if (stats.isDirectory()) {
        appLogger(`Path is a directory ${formatPath(filePath)}, skipping.`, {});
      } else {
        appLogger(
          `Unknown file type for ${formatPath(filePath)}, skipping.`,
          {}
        );
      }
    } catch (err) {
      appLogger(`Error deleting ${formatPath(filePath)}: ${err}`, {
        level: 'error',
      });
    }
  }
};

const getStatusIcon = (status: string): string => {
  const statusIcons: Record<string, string> = {
    pending: '⏲',
    pushing: '', // Spinner handled separately
    modified: '✔',
    pushed: '✔',
    error: '✖',
  };
  return statusIcons[status] || '';
};

const getStatusLine = (statusObj: DictionariesStatus): string => {
  let icon = getStatusIcon(statusObj.status);
  let colorStart = '';
  let colorEnd = '';

  if (statusObj.status === 'pushing') {
    // Use spinner frame
    icon = spinnerFrames[statusObj.spinnerFrameIndex! % spinnerFrames.length];
    colorStart = ANSIColors.BLUE;
    colorEnd = ANSIColors.RESET;
  } else if (statusObj.status === 'error') {
    colorStart = ANSIColors.RED;
    colorEnd = ANSIColors.RESET;
  } else if (statusObj.status === 'pushed' || statusObj.status === 'modified') {
    colorStart = ANSIColors.GREEN;
    colorEnd = ANSIColors.RESET;
  } else {
    colorStart = ANSIColors.GREY;
    colorEnd = ANSIColors.RESET;
  }

  return `- ${statusObj.dictionary.key} ${ANSIColors.GREY_DARK}[${colorStart}${icon}${statusObj.status}${ANSIColors.GREY_DARK}]${colorEnd}`;
};

const updateAllStatusLines = (dictionariesStatuses: DictionariesStatus[]) => {
  // Move cursor up to the first status line
  readline.moveCursor(process.stdout, 0, -dictionariesStatuses.length);
  for (const statusObj of dictionariesStatuses) {
    // Clear the line
    readline.clearLine(process.stdout, 0);

    if (statusObj.status === 'pushing') {
      // Update spinner frame
      statusObj.spinnerFrameIndex =
        (statusObj.spinnerFrameIndex! + 1) % spinnerFrames.length;
    }

    // Write the status line
    process.stdout.write(getStatusLine(statusObj) + '\n');
  }
};
