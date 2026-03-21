import { basename, join, relative } from 'node:path';
import type { AIOptions } from '@intlayer/api';
import {
  loadContentDeclarations,
  prepareIntlayer,
  writeContentDeclaration,
} from '@intlayer/chokidar/build';
import {
  type ListGitFilesOptions,
  logConfigDetails,
} from '@intlayer/chokidar/cli';
import {
  formatPath,
  getGlobalLimiter,
  getTaskLimiter,
} from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { Locale } from '@intlayer/types/allLocales';
import type { Fill } from '@intlayer/types/dictionary';
import {
  ensureArray,
  type GetTargetDictionaryOptions,
  getTargetUnmergedDictionaries,
} from '../getTargetDictionary';
import { setupAI } from '../utils/setupAI';
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
  logConfigDetails(options?.configOptions);

  const appLogger = getAppLogger(configuration);

  if (options?.build === true) {
    await prepareIntlayer(configuration, { forceRun: true });
  } else if (typeof options?.build === 'undefined') {
    await prepareIntlayer(configuration);
  }

  const { defaultLocale, locales } = configuration.internationalization;
  const mode = options?.mode ?? 'complete';
  const baseLocale = options?.sourceLocale ?? defaultLocale;

  const outputLocales = options?.outputLocales
    ? ensureArray(options.outputLocales)
    : locales;

  const aiResult = await setupAI(configuration, options?.aiOptions);

  if (!aiResult?.hasAIAccess) return;

  const { aiClient, aiConfig } = aiResult;

  const targetUnmergedDictionaries =
    await getTargetUnmergedDictionaries(options);

  // Load the original source content declaration files to recover function-type
  // `fill` values that are lost when dictionaries are JSON-serialised into
  // unmerged_dictionaries.cjs.  Dictionary-level fill takes priority over the
  // config-level fill, but we can only know that by reading the source files.
  const uniqueSourcePaths = [
    ...new Set(
      targetUnmergedDictionaries
        .map((unmergedDictionary) => unmergedDictionary.filePath)
        .filter(Boolean) as string[]
    ),
  ];
  const sourceDictionaries = await loadContentDeclarations(
    uniqueSourcePaths.map((sourcePath) =>
      join(configuration.system.baseDir, sourcePath)
    ),
    configuration
  );
  // Map relative filePath → original fill value from the source file
  const originalFillByPath = new Map<string, Fill | undefined>();

  for (const dict of sourceDictionaries) {
    if (dict.filePath) {
      originalFillByPath.set(dict.filePath, dict.fill as Fill | undefined);
    }
  }

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

  if (keysToProcess.length === 0) return;

  /**
   * List the translations tasks
   *
   * Create a list of per-locale dictionaries to translate
   *
   * In 'complete' mode, filter only the missing locales to translate
   */
  const translationTasks: TranslationTask[] = listTranslationsTasks(
    targetUnmergedDictionaries.map((dictionary) => dictionary.localId!),
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
  const nbConcurrentTasks = Math.max(
    1,
    Math.min(
      options?.nbConcurrentTasks ?? nbConcurrentTranslations,
      translationTasks.length
    )
  );

  const taskLimiter = getTaskLimiter(nbConcurrentTasks);

  const runners = translationTasks.map((task) =>
    taskLimiter(async () => {
      const relativePath = relative(
        configuration?.system?.baseDir ?? process.cwd(),
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
          onHandle: globalLimiter,
          aiClient,
          aiConfig,
        }
      );

      if (!translationTaskResult?.dictionaryOutput) return;

      const { dictionaryOutput, sourceLocale } = translationTaskResult;

      // Determine if we should write to separate files
      // - If dictionary has explicit fill setting (string, function, or object), use it
      // - If dictionary is per-locale AND has no explicit fill=false, use global fill config
      // - If dictionary is multilingual (no locale property), always write to same file
      //
      // NOTE: function-type fill values are lost during JSON serialisation of
      // unmerged_dictionaries.cjs.  We recover them by checking the original
      // source file that was loaded above (originalFillByPath).  Dictionary-level
      // fill always takes priority over config-level fill.
      const originalFill = originalFillByPath.get(
        dictionaryOutput.filePath ?? ''
      );

      // originalFill is undefined when the source file had no fill property; use
      // the (possibly JSON-preserved) dictionaryOutput.fill as a fallback so that
      // string/boolean fill values set directly on the dict still work.
      const dictFill: Fill | undefined =
        originalFill !== undefined ? originalFill : dictionaryOutput.fill;

      const hasDictionaryLevelFill =
        typeof dictFill === 'string' ||
        typeof dictFill === 'function' ||
        (typeof dictFill === 'object' && dictFill !== null);

      const isPerLocale = typeof dictionaryOutput.locale === 'string';

      const effectiveFill = hasDictionaryLevelFill
        ? dictFill
        : isPerLocale
          ? (configuration.dictionary?.fill ?? true)
          : (configuration.dictionary?.fill ?? false); // Multilingual dictionaries use config-level fill if set

      const isFillOtherFile =
        typeof effectiveFill === 'string' ||
        typeof effectiveFill === 'function' ||
        (typeof effectiveFill === 'object' && effectiveFill !== null);

      if (isFillOtherFile) {
        await writeFill(
          {
            ...dictionaryOutput,
            // Ensure fill is set on the dictionary for writeFill to use
            fill: effectiveFill,
          },
          outputLocales,
          [sourceLocale],
          configuration
        );
      } else {
        await writeContentDeclaration(dictionaryOutput, configuration);

        if (dictionaryOutput.filePath) {
          appLogger(
            `${task.dictionaryPreset} Content declaration written to ${formatPath(basename(dictionaryOutput.filePath))}`,
            { level: 'info' }
          );
        }
      }
    })
  );

  await Promise.all(runners);
  await (globalLimiter as any).onIdle();
};
