import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { AIOptions } from '@intlayer/api'; // OAuth handled by API proxy
import {
  formatLocale,
  formatPath,
  type ListGitFilesOptions,
  listGitFiles,
  listGitLines,
  parallelize,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colorize,
  colorizeNumber,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Locale } from '@intlayer/types';
import fg from 'fast-glob';
import { reviewFileBlockAware } from './reviewDocBlockAware';
import { checkFileModifiedRange } from './utils/checkFileModifiedRange';
import { getOutputFilePath } from './utils/getOutputFilePath';
import { setupAI } from './utils/setupAI';

type ReviewDocOptions = {
  docPattern: string[];
  locales: Locale[];
  excludedGlobPattern: string[];
  baseLocale: Locale;
  aiOptions?: AIOptions;
  nbSimultaneousFileProcessed?: number;
  configOptions?: GetConfigurationOptions;
  customInstructions?: string;
  skipIfModifiedBefore?: number | string | Date;
  skipIfModifiedAfter?: number | string | Date;
  skipIfExists?: boolean;
  gitOptions?: ListGitFilesOptions;
};

/**
 * Main audit function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then audits them to each locale in LOCALE_LIST.
 */
export const reviewDoc = async ({
  docPattern,
  locales,
  excludedGlobPattern,
  baseLocale,
  aiOptions,
  nbSimultaneousFileProcessed,
  configOptions,
  customInstructions,
  skipIfModifiedBefore,
  skipIfModifiedAfter,
  skipIfExists,
  gitOptions,
}: ReviewDocOptions) => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

  const aiResult = await setupAI(configuration, aiOptions);

  if (!aiResult?.hasAIAccess) return;

  const { aiClient, aiConfig } = aiResult;

  if (nbSimultaneousFileProcessed && nbSimultaneousFileProcessed > 10) {
    appLogger(
      `Warning: nbSimultaneousFileProcessed is set to ${nbSimultaneousFileProcessed}, which is greater than 10. Setting it to 10.`
    );
    nbSimultaneousFileProcessed = 10; // Limit the number of simultaneous file processed to 10
  }

  let docList: string[] = await fg(docPattern, {
    ignore: excludedGlobPattern,
  });

  if (gitOptions) {
    const gitChangedFiles = await listGitFiles(gitOptions);

    if (gitChangedFiles) {
      // Convert dictionary file paths to be relative to git root for comparison

      // Filter dictionaries based on git changed files
      docList = docList.filter((path) =>
        gitChangedFiles.some((gitFile) => join(process.cwd(), path) === gitFile)
      );
    }
  }

  // OAuth handled by API proxy internally

  appLogger(`Base locale is ${formatLocale(baseLocale)}`);
  appLogger(
    `Reviewing ${colorizeNumber(locales.length)} locales: [ ${formatLocale(locales)} ]`
  );

  appLogger(`Reviewing ${colorizeNumber(docList.length)} files:`);
  appLogger(docList.map((path) => ` - ${formatPath(path)}\n`));

  // Create all tasks to be processed
  const allTasks = docList.flatMap((docPath) =>
    locales.map((locale) => async () => {
      appLogger(
        `Reviewing file: ${formatPath(docPath)} to ${formatLocale(locale)}`
      );

      const absoluteBaseFilePath = join(configuration.content.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      // Skip if file exists and skipIfExists option is enabled
      if (skipIfExists && existsSync(outputFilePath)) {
        const relativePath = relative(
          configuration.content.baseDir,
          outputFilePath
        );
        appLogger(
          `${colorize('⊘', ANSIColors.YELLOW)} File ${formatPath(relativePath)} already exists, skipping.`
        );
        return;
      }

      const fileModificationData = checkFileModifiedRange(outputFilePath, {
        skipIfModifiedBefore,
        skipIfModifiedAfter,
      });

      if (fileModificationData.isSkipped) {
        appLogger(fileModificationData.message);
        return;
      }

      let changedLines: number[] | undefined;
      // FIXED: Enable git optimization that was previously commented out
      if (gitOptions) {
        const gitChangedLines = await listGitLines(
          absoluteBaseFilePath,
          gitOptions
        );

        appLogger(`Git changed lines: ${gitChangedLines.join(', ')}`);
        changedLines = gitChangedLines;
      }

      await reviewFileBlockAware(
        absoluteBaseFilePath,
        outputFilePath,
        locale as Locale,
        baseLocale,
        aiOptions,
        configOptions,
        customInstructions,
        changedLines,
        aiClient,
        aiConfig
      );
    })
  );

  await parallelize(
    allTasks,
    (task) => task(),
    nbSimultaneousFileProcessed ?? 3
  );
};
