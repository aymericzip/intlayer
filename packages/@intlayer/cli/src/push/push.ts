import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';
import * as readline from 'node:readline';
import { getIntlayerAPIProxy } from '@intlayer/api';
import {
  formatPath,
  type ListGitFilesOptions,
  listGitFiles,
  parallelize,
  prepareIntlayer,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary } from '@intlayer/types';
import { PushLogger, type PushStatus } from '../pushLog';
import { checkCMSAuth } from '../utils/checkAccess';

type PushOptions = {
  deleteLocaleDictionary?: boolean;
  keepLocaleDictionary?: boolean;
  dictionaries?: string[];
  gitOptions?: ListGitFilesOptions;
  configOptions?: GetConfigurationOptions;
  build?: boolean;
};

type DictionariesStatus = {
  dictionary: Dictionary;
  status: 'pending' | 'pushing' | 'modified' | 'pushed' | 'unknown' | 'error';
  error?: Error;
  errorMessage?: string;
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

  if (options?.build === true) {
    await prepareIntlayer(config, { forceRun: true });
  } else if (typeof options?.build === 'undefined') {
    await prepareIntlayer(config);
  }

  try {
    const hasCMSAuth = await checkCMSAuth(config);

    if (!hasCMSAuth) return;

    const intlayerAPI = getIntlayerAPIProxy(undefined, config);

    const dictionariesRecord = getDictionaries(config);
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
        options.dictionaries?.includes(dictionary.key)
      );
    }

    if (options?.gitOptions) {
      const gitFiles = await listGitFiles(options.gitOptions);

      dictionaries = dictionaries.filter((dictionary) =>
        gitFiles.includes(
          join(config.content.baseDir, dictionary.filePath ?? '')
        )
      );
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
      (dictionary) => ({
        dictionary,
        status: 'pending',
      })
    );

    // Initialize aggregated logger similar to loadDictionaries
    const logger = new PushLogger();
    logger.update(
      dictionariesStatuses.map<PushStatus>((s) => ({
        dictionaryKey: s.dictionary.key,
        status: 'pending',
      }))
    );

    const successfullyPushedDictionaries: Dictionary[] = [];

    const processDictionary = async (
      statusObj: DictionariesStatus
    ): Promise<void> => {
      statusObj.status = 'pushing';
      logger.update([
        { dictionaryKey: statusObj.dictionary.key, status: 'pushing' },
      ]);

      try {
        const pushResult = await intlayerAPI.dictionary.pushDictionaries([
          statusObj.dictionary,
        ]);

        const updatedDictionaries = pushResult.data?.updatedDictionaries || [];
        const newDictionaries = pushResult.data?.newDictionaries || [];

        if (updatedDictionaries.includes(statusObj.dictionary.key)) {
          statusObj.status = 'modified';
          successfullyPushedDictionaries.push(statusObj.dictionary);
          logger.update([
            { dictionaryKey: statusObj.dictionary.key, status: 'modified' },
          ]);
        } else if (newDictionaries.includes(statusObj.dictionary.key)) {
          statusObj.status = 'pushed';
          successfullyPushedDictionaries.push(statusObj.dictionary);
          logger.update([
            { dictionaryKey: statusObj.dictionary.key, status: 'pushed' },
          ]);
        } else {
          statusObj.status = 'unknown';
        }
      } catch (error) {
        statusObj.status = 'error';
        statusObj.error = error as Error;
        statusObj.errorMessage = `Error pushing dictionary ${statusObj.dictionary.key}: ${error}`;
        logger.update([
          { dictionaryKey: statusObj.dictionary.key, status: 'error' },
        ]);
      }
    };

    // Process dictionaries in parallel with a concurrency limit (reuse parallelize)
    await parallelize(dictionariesStatuses, processDictionary, 5);

    // Stop the logger and render final state
    logger.finish();

    // Print per-dictionary summary similar to loadDictionaries
    const iconFor = (status: DictionariesStatus['status']) => {
      switch (status) {
        case 'pushed':
        case 'modified':
          return '✔';
        case 'error':
          return '✖';
        default:
          return '⏲';
      }
    };

    const colorFor = (status: DictionariesStatus['status']) => {
      switch (status) {
        case 'pushed':
        case 'modified':
          return ANSIColors.GREEN;
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
        ` - ${s.dictionary.key} ${ANSIColors.GREY}[${color}${icon} ${s.status}${ANSIColors.GREY}]${ANSIColors.RESET}`
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
