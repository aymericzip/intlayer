import { existsSync } from 'fs';
import * as fsPromises from 'fs/promises';
import { basename, dirname, extname } from 'path';
import * as readline from 'readline';
import { getConfiguration } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { intlayerAPI } from '@intlayer/design-system/libs';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import _ from 'lodash';
import pLimit from 'p-limit';

type PullOptions = {
  dictionaries?: string[];
  newDictionariesPath?: string;
  logPrefix?: string;
};

type DictionariesStatus = {
  dictionaryKey: string;
  status:
    | 'pending'
    | 'fetching'
    | 'up-to-date'
    | 'updated'
    | 'fetched'
    | 'unknown'
    | 'error'
    | 'imported'
    | 'reimported in JSON'
    | 'reimported in new location';
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
const YELLOW = '\x1b[33m';

const DEFAULT_NEW_DICTIONARY_PATH = 'intlayer-dictionaries';

/**
 * Fetch distant dictionaries and write them locally,
 * with progress indicators and concurrency control.
 */
export const pull = async (options?: PullOptions): Promise<void> => {
  try {
    const {
      editor: { clientId, clientSecret },
    } = getConfiguration();

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project.'
      );
    }

    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    // Get the list of dictionary keys
    const getDictionariesKeysResult =
      await intlayerAPI.dictionary.getDictionariesKeys({
        headers: { Authorization: `Bearer ${oAuth2AccessToken}` },
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
      console.error('No dictionaries to fetch');
      return;
    }

    console.info('Fetching dictionaries:');

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
    const limit = pLimit(5); // Adjust the limit as needed

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
            headers: { Authorization: `Bearer ${oAuth2AccessToken}` },
          }
        );

        const distantDictionary = getDictionaryResult.data;

        if (!distantDictionary) {
          throw new Error(
            `Dictionary ${statusObj.dictionaryKey} not found on remote`
          );
        }

        // Now, write the dictionary to local file
        const writeStatus = await writeDictionary(distantDictionary, options);

        statusObj.status = writeStatus;

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
        console.error(statusObj.errorMessage);
      }
    }
  } catch (error) {
    console.error(error);
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
  return statusIcons[status] || '';
};

const getStatusLine = (statusObj: DictionariesStatus): string => {
  let icon = getStatusIcon(statusObj.status);
  let colorStart = '';
  let colorEnd = '';

  if (statusObj.status === 'fetching') {
    // Use spinner frame
    icon = spinnerFrames[statusObj.spinnerFrameIndex! % spinnerFrames.length];
    colorStart = BLUE;
    colorEnd = RESET;
  } else if (statusObj.status === 'error') {
    colorStart = RED;
    colorEnd = RESET;
  } else if (
    statusObj.status === 'fetched' ||
    statusObj.status === 'imported' ||
    statusObj.status === 'updated' ||
    statusObj.status === 'up-to-date'
  ) {
    colorStart = GREEN;
    colorEnd = RESET;
  } else if (
    statusObj.status === 'reimported in JSON' ||
    statusObj.status === 'reimported in new location'
  ) {
    colorStart = YELLOW;
    colorEnd = RESET;
  } else {
    colorStart = GREY;
    colorEnd = RESET;
  }

  return `- ${statusObj.dictionaryKey} [${colorStart}${icon} ${statusObj.status}${colorEnd}]`;
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

const writeDictionary = async (
  distantDictionary: Dictionary,
  options?: PullOptions
): Promise<DictionariesStatus['status']> => {
  const {
    content: { baseDir },
  } = getConfiguration();

  const newDictionaryRelativeLocationPath =
    options?.newDictionariesPath ?? DEFAULT_NEW_DICTIONARY_PATH;
  const newDictionaryLocationPath = `${baseDir}/${newDictionaryRelativeLocationPath}`;

  const existingDictionary = dictionariesRecord[distantDictionary.key];

  if (existingDictionary) {
    const { filePath } = existingDictionary;

    // Compare existing dictionary with distant dictionary
    if (_.isEqual(existingDictionary, distantDictionary)) {
      // Up to date, nothing to do
      return 'up-to-date';
    } else {
      if (filePath) {
        const isDictionaryJSON = filePath.endsWith('.json');

        if (isDictionaryJSON) {
          // Write the dictionary to the same location of the existing dictionary file
          await fsPromises.writeFile(
            `${baseDir}/${filePath}`,
            JSON.stringify(distantDictionary, null, 2)
          );
          return 'updated';
        } else {
          // Write the dictionary to the intlayer-dictionaries directory
          const dictionariesDirPath = dirname(filePath);
          const dictionariesFileName = basename(filePath, extname(filePath));

          const newFilePath = `${dictionariesDirPath}/${dictionariesFileName}.json`;

          await writeFileWithDirectories(
            newFilePath,
            JSON.stringify(distantDictionary, null, 2)
          );
          return 'reimported in JSON';
        }
      } else {
        // Write the dictionary to the intlayer-dictionaries directory
        const dictionaryPath = `${newDictionaryLocationPath}/${distantDictionary.key}.content.json`;
        await writeFileWithDirectories(
          dictionaryPath,
          JSON.stringify(distantDictionary, null, 2)
        );
        return 'reimported in new location';
      }
    }
  } else {
    // No existing dictionary, write to new location
    const dictionaryPath = `${newDictionaryLocationPath}/${distantDictionary.key}.content.json`;

    await writeFileWithDirectories(
      dictionaryPath,
      JSON.stringify(distantDictionary, null, 2)
    );

    return 'imported';
  }
};

const writeFileWithDirectories = async (
  filePath: string,
  data: string | Buffer
): Promise<void> => {
  try {
    // Extract the directory from the file path
    const dir = dirname(filePath);

    // Check if the directory exists
    const directoryExists = existsSync(dir);

    if (!directoryExists) {
      // Create the directory recursively
      await fsPromises.mkdir(dir, { recursive: true });
    }

    // Write the file
    await fsPromises.writeFile(filePath, data);
  } catch (error) {
    throw new Error(`Error writing file to ${filePath}: ${error}`);
  }
};
