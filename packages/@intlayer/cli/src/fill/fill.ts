import { basename, relative } from 'node:path';
import type { AIOptions } from '@intlayer/api';
import {
  formatPath,
  getGlobalLimiter,
  getTaskLimiter,
  type ListGitFilesOptions,
  prepareIntlayer,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizePath,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Locale } from '@intlayer/types';
import {
  ensureArray,
  type GetTargetDictionaryOptions,
  getTargetUnmergedDictionaries,
} from '../getTargetDictionary';
import { checkAIAccess } from '../utils/checkAccess';
import {
  listTranslationsTasks,
  type TranslationTask,
} from './listTranslationsTasks';
import { translateDictionary } from './translateDictionary';
import { writeFill } from './writeFill';

const NB_CONCURRENT_TRANSLATIONS = 7;

// Arguments for the fill function
export type FillOptions = {
  sourceLocale?: Locale;
  outputLocales?: Locale | Locale[];
  mode?: 'complete' | 'review';
  gitOptions?: ListGitFilesOptions;
  aiOptions?: AIOptions; // Added aiOptions to be passed to translateJSON
  verbose?: boolean;
  nbConcurrentTranslations?: number;
  nbConcurrentTasks?: number; // NEW: number of tasks that may run at once
  build?: boolean;
  skipMetadata?: boolean;
} & GetTargetDictionaryOptions;

/**
 * Fill translations based on the provided options.
 */
export const fill = async (options?: FillOptions): Promise<void> => {
  const configuration = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  if (options?.build === true) {
    await prepareIntlayer(configuration, { forceRun: true });
  } else if (typeof options?.build === 'undefined') {
    await prepareIntlayer(configuration);
  }

  const { defaultLocale, locales } = configuration.internationalization;
  const mode = options?.mode ?? 'complete';
  const baseLocale = options?.sourceLocale ?? defaultLocale;
  const outputLocales = (
    options?.outputLocales ? ensureArray(options.outputLocales) : locales
  ).filter((locale) => locale !== baseLocale);

  const hasAIAccess = await checkAIAccess(configuration, options?.aiOptions);

  if (!hasAIAccess) return;

  const targetUnmergedDictionaries =
    await getTargetUnmergedDictionaries(options);

  const affectedDictionaryKeys = new Set<string>();
  targetUnmergedDictionaries.forEach((dict) => {
    affectedDictionaryKeys.add(dict.key);
  });

  const keysToProcess = Array.from(affectedDictionaryKeys);

  appLogger([
    'Affected dictionary keys for processing:',
    keysToProcess.length > 0
      ? keysToProcess.map((key) => colorizeKey(key)).join(', ')
      : colorize('No keys found', ANSIColors.YELLOW),
  ]);

  /**
   * List the translations tasks
   *
   * Create a list of per-locale dictionaries to translate
   *
   * In 'complete' mode, filter only the missing locales to translate
   */
  const translationTasks: TranslationTask[] = listTranslationsTasks(
    targetUnmergedDictionaries.map((dict) => dict.localId!),
    outputLocales,
    mode,
    baseLocale,
    configuration
  );

  // AI calls in flight at once (translateJSON + metadata audit)
  const nbConcurrentTranslations =
    options?.nbConcurrentTranslations ?? NB_CONCURRENT_TRANSLATIONS;
  const globalLimiter = getGlobalLimiter(nbConcurrentTranslations);

  // NEW: number of *tasks* that may run at once (start/prepare/log/write)
  const nbConcurrentTasks = Math.min(
    options?.nbConcurrentTasks ?? nbConcurrentTranslations,
    translationTasks.length
  );
  const taskLimiter = getTaskLimiter(nbConcurrentTasks);

  const runners = translationTasks.map((task) =>
    taskLimiter(async () => {
      const relativePath = relative(
        configuration?.content?.baseDir ?? process.cwd(),
        task?.dictionaryFilePath ?? ''
      );

      // log AFTER acquiring a task slot
      appLogger(
        `${task.dictionaryPreset} Processing ${colorizePath(basename(relativePath))}`,
        { level: 'info' }
      );

      const translationTaskResult = await translateDictionary(
        task,
        configuration,
        {
          mode,
          aiOptions: options?.aiOptions,
          fillMetadata: !options?.skipMetadata,
          onHandle: globalLimiter, // <= AI calls go through here
        }
      );

      if (!translationTaskResult?.dictionaryOutput) return;

      const { dictionaryOutput, sourceLocale } = translationTaskResult;

      // fix impossible && condition
      const isFillOtherFile =
        typeof dictionaryOutput.fill === 'string' ||
        typeof dictionaryOutput.fill === 'object';

      if (isFillOtherFile) {
        await writeFill(
          dictionaryOutput,
          outputLocales,
          [sourceLocale],
          configuration
        );
      } else {
        await writeContentDeclaration(dictionaryOutput, configuration);

        if (dictionaryOutput.filePath) {
          const dictionaryPreset = colon(
            [
              ' - ',
              colorize('[', ANSIColors.GREY_DARK),
              colorizeKey(dictionaryOutput.key),
              colorize(']', ANSIColors.GREY_DARK),
            ].join(''),
            { colSize: 15 }
          );
          appLogger(
            `${dictionaryPreset} Content declaration written to ${formatPath(basename(dictionaryOutput.filePath))}`,
            { level: 'info' }
          );
        }
      }
    })
  );

  await Promise.all(runners);
  await (globalLimiter as any).onIdle();
};
