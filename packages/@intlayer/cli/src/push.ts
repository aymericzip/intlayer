import * as fsPromises from 'fs/promises';
import { relative } from 'path';
import * as readline from 'readline';
import { getConfiguration, logger } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { intlayerAPI } from '@intlayer/design-system/libs';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import pLimit from 'p-limit';

type PushOptions = {
  deleteLocaleDictionary?: boolean;
  keepLocaleDictionary?: boolean;
  dictionaries?: string[];
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

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const GREY = '\x1b[90m';
const GREY_DARK = '\x1b[90m';

/**
 * Get all locale dictionaries and push them simultaneously.
 */
export const push = async (options?: PushOptions): Promise<void> => {
  try {
    const { clientId, clientSecret } = getConfiguration().editor;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    let dictionaries: Dictionary[] = Object.values(dictionariesRecord);
    const existingDictionariesKeys: string[] = Object.keys(dictionariesRecord);

    if (options?.dictionaries) {
      // Check if the provided dictionaries exist
      const noneExistingDictionariesOption = options.dictionaries.filter(
        (dictionaryId) => !existingDictionariesKeys.includes(dictionaryId)
      );

      if (noneExistingDictionariesOption.length > 0) {
        logger(
          `The following dictionaries do not exist: ${noneExistingDictionariesOption.join(
            ', '
          )} and have been ignored.`,
          { level: 'error' }
        );
      }

      // Filter the dictionaries from the provided list of IDs
      dictionaries = dictionaries.filter((dictionary) =>
        options.dictionaries!.includes(dictionary.key)
      );
    }

    // Check if the dictionaries list is empty
    if (dictionaries.length === 0) {
      logger('No local dictionaries found', { level: 'error' });
      return;
    }

    logger('Pushing dictionaries:');

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
        const pushResult = await intlayerAPI.dictionary.pushDictionaries(
          [statusObj.dictionary],
          {
            headers: {
              Authorization: `Bearer ${oAuth2AccessToken}`,
            },
          }
        );

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
        logger(statusObj.errorMessage, { level: 'error' });
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
      await deleteLocalDictionaries(successfullyPushedDictionaries);
    } else if (keepOption) {
      // Do nothing, keep the local dictionaries
    } else {
      // Ask the user
      const answer = await askUser(
        'Do you want to delete the local dictionaries that were successfully pushed? (yes/no): '
      );
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        await deleteLocalDictionaries(successfullyPushedDictionaries);
      }
    }
  } catch (error) {
    logger(error, { level: 'error' });
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
  dictionariesToDelete: Dictionary[]
): Promise<void> => {
  const { baseDir } = getConfiguration().content;

  // Use a Set to collect all unique file paths
  const filePathsSet: Set<string> = new Set();

  for (const dictionary of dictionariesToDelete) {
    const { filePath } = dictionary;

    if (!filePath) {
      logger(`Dictionary ${dictionary.key} does not have a file path`, {
        level: 'error',
      });
      continue;
    }

    filePathsSet.add(filePath);
  }

  for (const filePath of filePathsSet) {
    const relativePath = relative(baseDir, filePath);

    try {
      const stats = await fsPromises.lstat(filePath);

      if (stats.isFile()) {
        await fsPromises.unlink(filePath);
        logger(`Deleted file ${relativePath}`);
      } else if (stats.isDirectory()) {
        logger(`Path is a directory ${relativePath}, skipping.`);
      } else {
        logger(`Unknown file type for ${relativePath}, skipping.`);
      }
    } catch (err) {
      logger(`Error deleting ${relativePath}: ${err}`, {
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
  const {
    log: { prefix },
  } = getConfiguration();

  let icon = getStatusIcon(statusObj.status);
  let colorStart = '';
  let colorEnd = '';

  if (statusObj.status === 'pushing') {
    // Use spinner frame
    icon = spinnerFrames[statusObj.spinnerFrameIndex! % spinnerFrames.length];
    colorStart = BLUE;
    colorEnd = RESET;
  } else if (statusObj.status === 'error') {
    colorStart = RED;
    colorEnd = RESET;
  } else if (statusObj.status === 'pushed' || statusObj.status === 'modified') {
    colorStart = GREEN;
    colorEnd = RESET;
  } else {
    colorStart = GREY;
    colorEnd = RESET;
  }

  return `- ${statusObj.dictionary.key} ${GREY_DARK}[${colorStart}${icon}${statusObj.status}${GREY_DARK}]${colorEnd}`;
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
