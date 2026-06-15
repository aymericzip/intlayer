import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { AIConfig } from '@intlayer/ai';
import type { AIOptions } from '@intlayer/api';
import {
  type ListGitFilesOptions,
  listGitFiles,
  listGitLines,
  logConfigDetails,
} from '@intlayer/chokidar/cli';
import { buildReviewReport } from '@intlayer/chokidar/docReview';
import {
  formatLocale,
  formatPath,
  parallelize,
} from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  colorizeNumber,
  getAppLogger,
  x,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { Locale } from '@intlayer/types/allLocales';
import fg from 'fast-glob';
import { checkFileModifiedRange } from '../utils/checkFileModifiedRange';
import { formatLineRanges } from '../utils/formatLineRanges';
import { getOutputFilePath } from '../utils/getOutputFilePath';
import { type AIClient, setupAI } from '../utils/setupAI';
import { reviewFileBlockAware } from './reviewDocBlockAware';
import { logReviewFileBlocks } from './reviewDocLog';

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
  /**
   * Log-only mode. Instead of translating the changed blocks with AI, log the
   * blocks that need attention (with line numbers and content) for the base and
   * target locales, so another agent can generate the translations.
   */
  log?: boolean;
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
  log,
}: ReviewDocOptions) => {
  const configuration = getConfiguration(configOptions);
  logConfigDetails(configOptions);

  const appLogger = getAppLogger(configuration);

  // Log-only mode does not call any AI, so the AI access checks are skipped.
  let aiClient: AIClient | undefined;
  let aiConfig: AIConfig | undefined;

  if (!log) {
    const aiResult = await setupAI(configuration, aiOptions);

    if (!aiResult?.hasAIAccess) return;

    aiClient = aiResult.aiClient;
    aiConfig = aiResult.aiConfig;

    if (aiResult.isCustomAI && aiClient && aiConfig) {
      const { hasAIAccess, error } = await aiClient.checkAISDKAccess(aiConfig);
      if (!hasAIAccess) {
        appLogger(`${x} ${error}`);
        return;
      }
    }
  }

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

      const absoluteBaseFilePath = join(configuration.system.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      // Skip if file exists and skipIfExists option is enabled
      if (skipIfExists && existsSync(outputFilePath)) {
        const relativePath = relative(
          configuration.system.baseDir,
          outputFilePath
        );
        appLogger(
          `${colorize('⊘', ANSIColors.YELLOW)} File ${formatPath(relativePath)} already exists, skipping.`
        );
        return;
      }

      // Check modification range only if the file exists
      if (existsSync(outputFilePath)) {
        const fileModificationData = checkFileModifiedRange(outputFilePath, {
          skipIfModifiedBefore,
          skipIfModifiedAfter,
        });

        if (fileModificationData.isSkipped) {
          appLogger(fileModificationData.message);
          return;
        }
      } else if (skipIfModifiedBefore || skipIfModifiedAfter) {
        // Log if we intended to check modification time but couldn't because the file doesn't exist
        appLogger(
          `${colorize('!', ANSIColors.YELLOW)} File ${formatPath(outputFilePath)} does not exist, skipping modification date check.`
        );
      }

      let changedLines: number[] | undefined;
      // FIXED: Enable git optimization that was previously commented out
      if (gitOptions) {
        const gitChangedLines = await listGitLines(
          absoluteBaseFilePath,
          gitOptions
        );
        changedLines = gitChangedLines;

        // Report the base lines that changed, then the corresponding line span
        // in the target document — i.e. the blocks the alignment will actually
        // re-translate. `review` blocks are exactly the aligned base blocks the
        // changed lines touched, so their `targetLineRange` is the matching span
        // in the existing translation.
        appLogger(
          `Changed lines (${formatLocale(baseLocale)}): ${formatLineRanges(gitChangedLines)}`
        );

        const baseText = await readFile(absoluteBaseFilePath, 'utf-8').catch(
          () => ''
        );
        const targetText = existsSync(outputFilePath)
          ? await readFile(outputFilePath, 'utf-8').catch(() => '')
          : '';

        const { blocks } = buildReviewReport({
          baseText,
          targetText,
          changedLines: gitChangedLines,
        });

        const correspondingTargetLines = blocks.flatMap((block) => {
          if (block.action !== 'review' || !block.targetLineRange) return [];

          const { start, end } = block.targetLineRange;
          return Array.from(
            { length: end - start + 1 },
            (_unused, offset) => start + offset
          );
        });

        appLogger(
          `Corresponding block (${formatLocale(locale)}): ${formatLineRanges(correspondingTargetLines)}`
        );
      }

      if (log) {
        await logReviewFileBlocks(
          absoluteBaseFilePath,
          outputFilePath,
          locale as Locale,
          baseLocale,
          configOptions,
          changedLines
        );
        return;
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
